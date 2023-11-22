using System;
using System.Collections.Generic;

namespace billingWebAPI.Models
{
    public partial class ProductRetailerMasterTb
    {
        public int ProductRetailerId { get; set; }
        public int? ProductId { get; set; }
        public int? UserId { get; set; }
        public int? Quantity { get; set; }
        public int? ProductStock { get; set; }

        public virtual ProductTb? Product { get; set; }
        public virtual UsersTb? User { get; set; }
    }
}
