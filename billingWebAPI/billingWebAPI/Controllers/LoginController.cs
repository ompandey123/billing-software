﻿using billingWebAPI.Models;
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

        private async Task<User> AuthenticateUserAsync(string email, string password)
        {
            // Use Async method to query DB
            var usersTb = await _context.UsersTbs.SingleOrDefaultAsync(u => u.Email == email && u.Password == password);

            if (usersTb != null)
            {
                var user = new User
                {
                    // Map properties accordingly
                    Email = usersTb.Email,
                    Password = usersTb.Password,
                    // Add other properties as needed
                };

                return user;
            }

            return null;
        }

        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                null,
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Login user)
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
