using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace billingWebAPI.Models
{
    public partial class UsersTb
    {
        public UsersTb()
        {
            //BillingDetailTbs = new HashSet<BillingDetailTb>();
            //ProductRetailerMasterTbs = new HashSet<ProductRetailerMasterTb>();
            //ProductTbs = new HashSet<ProductTb>();
        }

        public int UserId { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Contact { get; set; }
        public string? UserType { get; set; }

        [JsonIgnore]
        public virtual ICollection<BillingDetailTb>? BillingDetailTbs { get; set; }
        [JsonIgnore]
        public virtual ICollection<ProductRetailerMasterTb>? ProductRetailerMasterTbs { get; set; }
        [JsonIgnore]
        public virtual ICollection<ProductTb>? ProductTbs { get; set; }
    }
}
