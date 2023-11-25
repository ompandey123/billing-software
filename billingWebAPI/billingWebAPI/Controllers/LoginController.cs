using billingWebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace billingWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly billingDBContext _context;

        public LoginController(IConfiguration config, billingDBContext context)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
            _context = context ?? throw new ArgumentNullException(nameof(_context));
        }

        private async Task<UsersTb> AuthenticateUserAsync(string email, string password)
        {
            //Use Async method to query DB
            return await _context.UsersTbs.SingleOrDefaultAsync(u => u.Email == email && u.Password == password)!;
        }

        private string GenerateToken(UsersTb user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                null,
                expires: DateTime.Now.AddMinutes(1),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UsersTb user)
        {
            IActionResult response = Unauthorized();
            var authenticateUser = await AuthenticateUserAsync(user.Email, user.Password);

            if (authenticateUser != null)
            { 
                var token = GenerateToken(authenticateUser);
                response = Ok(new {Token = token});
            }

            return response;
        }
    }
}
