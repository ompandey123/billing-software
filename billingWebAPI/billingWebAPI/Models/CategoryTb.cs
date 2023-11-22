using System;
using System.Collections.Generic;

namespace billingWebAPI.Models
{
    public partial class CategoryTb
    {
        public CategoryTb()
        {
            ProductTbs = new HashSet<ProductTb>();
        }

        public int CategoryId { get; set; }
        public int? CompanyId { get; set; }
        public string? CategoryName { get; set; }
        public string? CommonName { get; set; }
        public int? Sgst { get; set; }
        public int? Cgst { get; set; }
        public int? Igst { get; set; }
        public int? Pgst { get; set; }

        public virtual CompanyTb? Company { get; set; }
        public virtual ICollection<ProductTb> ProductTbs { get; set; }
    }
}
