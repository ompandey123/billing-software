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
    public class SupplierController : ControllerBase
    {
        private readonly billingDBContext _context;

        public SupplierController(billingDBContext context)
        {
            _context = context;
        }

        [HttpPost("addSupplier")]
        public async Task<ActionResult<SupplierTb>> CreateSupplier([FromBody] SupplierTb supplier)
        {
            if (supplier == null)
            {
                return BadRequest("invalid Entry");
            }

            var parameters = new[]
            {
                new SqlParameter("@supplier_name", supplier.SupplierName),
                new SqlParameter("@address", supplier.Address),
                new SqlParameter("@contact", supplier.Contact)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC SupplierInsert @supplier_name, @address, @contact", parameters);

            var insertedSuppliers = await _context.SupplierTbs.FirstOrDefaultAsync(s => s.SupplierName == supplier.SupplierName);

            if (insertedSuppliers == null)
            {
                return BadRequest("Not Found");
            }

            return CreatedAtAction(nameof(GetSupplier), new { supplierId = insertedSuppliers.SupplierId }, insertedSuppliers);


        }

        [HttpGet("{supplierId}")]

        public async Task<ActionResult<ProductTb>> GetSupplier(int supplierId)
        {
            var supplier = await _context.SupplierTbs.FindAsync(supplierId);

            if (supplier == null)
            {
                return BadRequest("Not Found");
            }

            return Ok(supplier);
        }
    }
}
