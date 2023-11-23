using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization; // Add this using statement


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

        [JsonIgnore] // This property will be ignored in Swagger documentation
        public virtual ICollection<BillingDetailTb>? BillingDetailTbs { get; set; }

        [JsonIgnore] // This property will be ignored in Swagger documentation
        public virtual ICollection<ProductRetailerMasterTb>? ProductRetailerMasterTbs { get; set; }

        [JsonIgnore] // This property will be ignored in Swagger documentation
        public virtual ICollection<ProductTb>? ProductTbs { get; set; }
    }
}
