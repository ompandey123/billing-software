using billingWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace billingWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillingController : ControllerBase
    {
        private readonly billingDBContext _context;

        public BillingController()
        {
            _context = new billingDBContext();
        }

        [HttpPost("calculateBill")]
        public async Task<ActionResult<BillingDetailTb>> CalculateBill([FromBody] BillingDetailTb bill)
        {
            
        }
    }
}