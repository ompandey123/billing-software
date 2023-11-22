using System;
using System.Collections.Generic;

namespace billingWebAPI.Models
{
    public partial class ProductSupplierMaster
    {
        public int ProductSupplierId { get; set; }
        public int? SupplierId { get; set; }
        public int? ProductId { get; set; }

        public virtual ProductTb? Product { get; set; }
        public virtual SupplierTb? Supplier { get; set; }
    }
}
