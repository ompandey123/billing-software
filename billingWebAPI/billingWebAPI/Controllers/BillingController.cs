using Microsoft.AspNetCore.Mvc;

namespace billingWebAPI.Controllers
{
    public class BillingController : Controller
    {
        public IActionResult Index()
        {

            return View();
        }
    }
}
