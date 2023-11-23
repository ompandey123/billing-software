using billingWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Linq;
using Microsoft.EntityFrameworkCore;

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

        [HttpPost("addUser")]
        public async Task<ActionResult<UsersTb>> CreateUser([FromBody] UsersTb user)
        {
            if (user == null)
            {
                return BadRequest("Entry Invalid");
            }
            _context.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.UserId }, user);
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
