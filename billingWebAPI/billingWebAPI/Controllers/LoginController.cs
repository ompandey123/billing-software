using billingWebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace billingWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly billingDBContext _context;
        private readonly ILogger<LoginController> _logger;

        public LoginController(IConfiguration config, billingDBContext context, ILogger<LoginController> logger)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
            _context = context ?? throw new ArgumentNullException(nameof(_context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        private async Task<User> AuthenticateUserAsync(string email, string password)
        {

            _logger.LogInformation($"Authenticating user with email: {email}");

            // Use Async method to query DB
            var usersTb = await _context.UsersTbs.SingleOrDefaultAsync(u => u.Email == email && u.Password == password);

            if (usersTb != null)
            {
                var user = new User
                {
                    // Map properties accordingly
                    Email = usersTb.Email,
                    Password = usersTb.Password,
                    Username = usersTb.Username, // Make sure to include the username property
                    UserId = usersTb.UserId // Make sure to include the UserId property // Add other properties as needed
                };

                return user;
            }

            return null;
        }


        private string GenerateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, "Admin"),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),

            };
            _logger.LogInformation($"Token claims: {string.Join(", ", claims.Select(c => $"{c.Type}: {c.Value}"))}");


            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [AllowAnonymous]
        [HttpPost]

        public async Task<IActionResult> Login([FromBody] Login user)
        {
            IActionResult response = Unauthorized();
            var auntenticateUser = await AuthenticateUserAsync(user.Email, user.Password);

            if (auntenticateUser != null)
            {
                var token = GenerateToken(auntenticateUser);
                response = Ok(new { Token = token, auntenticateUser.UserId, Username= auntenticateUser.Username });
                _logger.LogInformation($"User '{user.Email}' successfully logged in.");
            }
            else
            {
                _logger.LogWarning($"Invalid login attempt for user with email: {user.Email}");
                return BadRequest("Invalid username or pwd");
            }
            return response;
        }

    }
}
