using billingWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace billingWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly billingDBContext _context;

        public UserController(billingDBContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost("addUser")]

        public async Task<ActionResult<UsersTb>> CreateUser([FromBody] UsersTb user)
        {
            if(user == null) 
            {
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

            var insertedUser = await _context.UsersTbs.SingleOrDefaultAsync(u => u.Username == user.Username && u.Email == user.Email);

            if(insertedUser == null)
            {
                return BadRequest("Failed To retrieve inserted User");
            }

            return CreatedAtAction(nameof(GetUser), new { id = insertedUser.UserId }, insertedUser);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsersTb>> GetUser(int id)
        {
            var user = await _context.UsersTbs.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}
