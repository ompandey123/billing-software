using billingWebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace billingWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly billingDBContext _context;

        public CategoryController(billingDBContext context)
        {
            _context = context;
        }

        [HttpPost("addCategory")]

        public async Task<ActionResult<CategoryTb>> CreateCategory([FromBody] CategoryTb category)
        {
            if (category == null)
            {
                return BadRequest("Invalid entry");
            }

            var parameters = new[]
            {
                new SqlParameter("@company_id", category.CompanyId),
                new SqlParameter("@cat_name", category.CategoryName),
                new SqlParameter("@common_name", category.CommonName),
                new SqlParameter("@cgst", category.Cgst),
                new SqlParameter("@sgst", category.Sgst),
                new SqlParameter("@igst", category.Igst),
                new SqlParameter("@pgst", category.Pgst),
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC CategoryInsert @company_id, @cat_name, @common_name, @cgst, @sgst, @igst, @pgst", parameters);

            var insertedCategory = await _context.CategoryTbs.SingleOrDefaultAsync(c => c.CategoryName == category.CategoryName && c.CommonName == category.CommonName);

            if (insertedCategory == null)
            {
                return BadRequest("Cannot fetch");
            }

            return CreatedAtAction(nameof(GetCategory), new { categoryId = insertedCategory.CategoryId }, insertedCategory);
        }

        [HttpGet("{categoryId}")]

        public async Task<ActionResult<CategoryTb>> GetCategory(int categoryId)
        {
            var category = await _context.CategoryTbs.FindAsync(categoryId);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductTb>>> GetCategories()
        {
            var categories = await _context.CategoryTbs.ToListAsync();

            if (categories == null || !categories.Any())
            {
                return NotFound();
            }

            return Ok(categories);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            var category = await _context.CategoryTbs.FindAsync(id);

            if(category == null)
            {
                return NotFound();  
            }
             
            _context.CategoryTbs.Remove(category);
            await   _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
