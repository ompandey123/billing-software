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
    public class CompanyController : ControllerBase
    {
        private readonly billingDBContext _context;

        public CompanyController(billingDBContext context)
        {
            _context = context;
        }

        [HttpPost("addCompany")]
        public async Task<ActionResult<CompanyTb>> createCompany([FromBody]CompanyTb company)
        {
            if (company == null) 
            {
                return BadRequest("Invalid Data Entry");
            }

            var parameters = new[]
            {
                new SqlParameter("@company_name", company.CompanyName),
                new SqlParameter("@company_admin", company.CompanyAdmin),
                new SqlParameter("@company_association", company.CompanyAssociation),
                new SqlParameter("@company_address", company.CompanyAddress),
                new SqlParameter("@GSTno", company.Gstno)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC companyInsert @company_name, @company_admin, @company_association, @company_address, @GSTno", parameters);

            var insertedCompany = await _context.CompanyTbs.SingleOrDefaultAsync(u => u.CompanyName == company.CompanyName && u.CompanyAdmin == company.CompanyAdmin);

            if (insertedCompany == null) 
            {
                return BadRequest("Cannot fetch");
            }

            return CreatedAtAction(nameof(GetCompany), new { companyId = insertedCompany.CompanyId }, insertedCompany);
        }

        [HttpGet("{companyId}")]

        public async Task<ActionResult<CompanyTb>> GetCompany(int companyId)
        {
            var company = await _context.CompanyTbs.FindAsync(companyId);

            if(company == null)
            {
                return BadRequest("Not Found");
            }

            return Ok(company);
        }
    }
}
