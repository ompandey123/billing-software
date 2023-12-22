using billingWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
//using Dapper;
using System.Runtime.CompilerServices;
using System.Data;

namespace billingWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly billingDBContext _context;
        private readonly ILogger<UserController> _logger;

        public UserController(billingDBContext context, ILogger<UserController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<UsersTb>> CreateUser([FromBody] UsersTb user)
        {
            if(user == null) 
            {
                _logger.LogWarning("Invalid user data. Please provide valid information.");
                return BadRequest("Invalid Entry");
            }

            var parameters = new[]
            {
                new SqlParameter("@username", user.Username),
                new SqlParameter("@email", user.Email),
                new SqlParameter("@password", user.Password),
                new SqlParameter("@phone_number", user.Contact),
                new SqlParameter("@user_type", user.UserType)
            };


            await _context.Database.ExecuteSqlRawAsync("EXEC InsertUser @username, @email, @password, @phone_number, @user_type", parameters);

            var insertedUser = await _context.UsersTbs.FirstOrDefaultAsync(u => u.Username == user.Username && u.Email == user.Email);

            if(insertedUser == null)
            {
                _logger.LogError("Failed to retrieve inserted user");
                return BadRequest("Failed To retrieve inserted User");
            }
            _logger.LogInformation($"User '{user.Username}' successfully created.");
            return CreatedAtAction(nameof(GetUser), new { id = insertedUser.UserId }, insertedUser);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsersTb>> GetUser(int id)
        {   
            var user = await _context.UsersTbs.FindAsync(id);

            if (user == null)
            {
                _logger.LogWarning($"User with ID {id} not found");
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsersTb>>> GetUsers()
        {
            var users = await _context.UsersTbs.ToListAsync();

            if (users == null || !users.Any())
            {
                return NotFound();
            }

            return Ok(users);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var user = await _context.UsersTbs.FindAsync(id);

            if (user == null)
            {
                _logger.LogWarning($"User with ID {id} not found");
                return NotFound();
            }

            _context.UsersTbs.Remove(user);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"User with ID {id} successfully deleted.");
            return NoContent();
        }

    }
}
