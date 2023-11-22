using System;
using System.Collections.Generic;

namespace billingWebAPI.Models
{
    public partial class BillingDetailTb
    {
        public int BillingDetailId { get; set; }
        public int? BillingId { get; set; }
        public int? CompanyId { get; set; }
        public int? PurchaseId { get; set; }
        public int? ProductId { get; set; }
        public int? UserId { get; set; }
        public string? ProductMeasurement { get; set; }
        public string? ProductPriceOn { get; set; }
        public int? TotalCost { get; set; }
        public string? Tax { get; set; }
        public int? GrandTotal { get; set; }
        public DateTime? BillingDate { get; set; }

        public virtual BillingMasterTb? Billing { get; set; }
        public virtual CompanyTb? Company { get; set; }
        public virtual ProductTb? Product { get; set; }
        public virtual UsersTb? User { get; set; }
    }
}
