using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace billingWebAPI.Models
{
    public partial class BillingDetailTb
    {
        public int BillingDetailId { get; set; }
        public int? BillingId { get; set; }
        public int? CompanyId { get; set; }
        public int? ProductId { get; set; }
        public int? UserId { get; set; }
        public string? ProductMeasurement { get; set; }
        public string? ProductPriceOn { get; set; }
        public int? TotalCost { get; set; }
        public double? Tax { get; set; }
        public double? GrandTotal { get; set; }
        public DateTime? BillingDate { get; set; }

        [JsonIgnore]
        public virtual BillingMasterTb? Billing { get; set; }
        [JsonIgnore]
        public virtual CompanyTb? Company { get; set; }
        [JsonIgnore]
        public virtual ProductTb? Product { get; set; }
        [JsonIgnore]
        public virtual UsersTb? User { get; set; }
    }
}
