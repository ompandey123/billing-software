using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace billingWebAPI.Models
{
    public partial class ProductSupplierMaster
    {
        public int ProductSupplierId { get; set; }
        public int? SupplierId { get; set; }
        public int? ProductId { get; set; }
        [JsonIgnore]
        public virtual ProductTb? Product { get; set; }
        [JsonIgnore]
        public virtual SupplierTb? Supplier { get; set; }
    }
}
