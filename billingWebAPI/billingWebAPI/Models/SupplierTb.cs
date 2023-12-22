using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace billingWebAPI.Models
{
    public partial class SupplierTb
    {
        public SupplierTb()
        {
            //ProductSupplierMasters = new HashSet<ProductSupplierMaster>();
        }

        public int SupplierId { get; set; }
        public string? SupplierName { get; set; }
        public string? Address { get; set; }
        public string? Contact { get; set; }

        [JsonIgnore]
        public virtual ICollection<ProductSupplierMaster>? ProductSupplierMasters { get; set; }
    }
}
