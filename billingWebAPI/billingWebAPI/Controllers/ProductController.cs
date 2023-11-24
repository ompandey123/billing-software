using billingWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace billingWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly billingDBContext _context;

        public ProductController(billingDBContext context) 
        {
            _context = context;
        }

        [HttpPost("addProduct")]

        public async Task<ActionResult<ProductTb>> createProduct([FromBody] ProductTb product)
        {
            if(product == null)
            {
                return BadRequest("Invalid Entry");
            }

            var parameters = new[]
           {
                new SqlParameter("@company_id", product.CompanyId),
                new SqlParameter("@cat_id", product.CategoryId),
                new SqlParameter("@user_id", product.UserId),
                new SqlParameter("@product_name", product.ProductName),
                new SqlParameter("@product_brand", product.ProductBrand),
                new SqlParameter("@product_measurement", product.ProductMeasurement),
                new SqlParameter("@product_price_on", product.ProductPriceOn),
                new SqlParameter("@product_packaging", product.ProductPackaging),
                new SqlParameter("@product_quantity", product.ProductQuantity),
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC ProductInsert @company_id, @cat_id, @user_id, @product_name, @product_brand, @product_measurement, @product_price_on, @product_packaging, @product_quantity", parameters);

            var insertedProduct = await _context.ProductTbs.SingleOrDefaultAsync(p => p.ProductName == product.ProductName);

            if(insertedProduct == null)
            {
                return BadRequest("Cannot Fetch");
            }

            return CreatedAtAction(nameof(GetProduct), new { productId = insertedProduct.ProductId }, insertedProduct);
        }

        [HttpGet("{productId}")]

        public async Task<ActionResult<ProductTb>> GetProduct(int productId)
        { 
            var product = await _context.ProductTbs.FindAsync(productId);

            if(product == null)
            {
                return BadRequest("Not Found");
            }

            return Ok(product);
        }
    }
}
    