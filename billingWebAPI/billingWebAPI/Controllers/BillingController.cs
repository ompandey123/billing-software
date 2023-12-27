using billingWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace billingWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillingController : ControllerBase
    {
        private readonly billingDBContext _context;

        public BillingController(billingDBContext context)
        {
            _context = context;
        }

        [HttpGet("GetBills")]

        public async Task<ActionResult<IEnumerable<BillTb>>> getAllBill()
        {
            var bill = await _context.BillTbs.ToListAsync();

            if (bill == null || !bill.Any())
            {
                return NotFound();
            }

            return Ok(bill);
        }

        [HttpPost("GenerateBill")]

        public async Task<ActionResult<BillTb>> Billgenerate([FromBody] BillTb bill)
        {
            try
            {
                var parameters = new[]
                {
                    new SqlParameter("@product_id", bill.ProductId),
                    new SqlParameter("@username", bill.Username),
                    new SqlParameter("@quantity", bill.Quantity),
                    new SqlParameter("@tax", bill.Tax)
                };

                await _context.Database.ExecuteSqlRawAsync("EXEC CalculateCostAndTotal @product_id, @username, @quantity, @tax", parameters);

                var generatedBill = await _context.BillTbs.OrderByDescending(b => b.BillId).FirstOrDefaultAsync();

                if (generatedBill == null)
                {
                    return BadRequest("Failed To generate Bill");
                }

                return Ok(generatedBill);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        [HttpGet("getBillDetail/{username}")]
        public async Task<ActionResult<IEnumerable<BillTb>>> getBillDetail(string username)
        {
            var bill = await _context.BillTbs
                             .Where(c => c.Username == username)
                             .ToListAsync();

            if (bill == null || !bill.Any())
            {
                return NotFound();
            }

            return Ok(bill);
        }

        [HttpGet("count")]
        public async Task<ActionResult<int>> getBillCount()
        {
            var billCount = await _context.BillTbs.CountAsync();

            return Ok(billCount);
        }

        [HttpGet("totalRevenue")]
        public async Task<ActionResult<int>> getTotalRevenue()
        {
            int totalRevenue = (int)await _context.BillTbs.SumAsync(bill => bill.GrandTotal);

            return Ok(totalRevenue);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            var bill = await _context.BillTbs.FindAsync(id);

            if (bill == null)
            {
                return NotFound();
            }

            _context.BillTbs.Remove(bill);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("totalRevenue/{username}")]
        public async Task<ActionResult<int>> getTotalRevenueByUsername(string username)
        {
            double? totalRevenue = await _context.BillTbs
                .Where(bill => bill.Username == username)
                .SumAsync(bill => bill.GrandTotal);

            // Explicitly cast the double? to int, handling null values
            int result = totalRevenue.HasValue ? (int)totalRevenue.Value : 0;

            return Ok(result);
        }
    }
}
