using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace billingWebAPI.Models
{
    public partial class ProductTb
    {
        public ProductTb()
        {
            //BillingDetailTbs = new HashSet<BillingDetailTb>();
            //ProductRetailerMasterTbs = new HashSet<ProductRetailerMasterTb>();
            //ProductSupplierMasters = new HashSet<ProductSupplierMaster>();
        }
            
        public int ProductId { get; set; }
        public int? CompanyId { get; set; }
        public int? CategoryId { get; set; }
        public int? UserId { get; set; }
        public string? ProductName { get; set; }
        public string? ProductBrand { get; set; }
        public string? ProductMeasurement { get; set; }
        public int ProductPriceOn { get; set; }
        public string? ProductPackaging { get; set; }
        public string? ProductQuantity { get; set; }

        [JsonIgnore]
        public virtual CategoryTb? Category { get; set; }

        [JsonIgnore]
        public virtual CompanyTb? Company { get; set; }

        [JsonIgnore]
        public virtual UsersTb? User { get; set; }

        [JsonIgnore]
        public virtual ICollection<BillingDetailTb>? BillingDetailTbs { get; set; }

        [JsonIgnore]
        public virtual ICollection<ProductRetailerMasterTb>? ProductRetailerMasterTbs { get; set; }

        [JsonIgnore]
        public virtual ICollection<ProductSupplierMaster>? ProductSupplierMasters { get; set; }
    }
}
