using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace billingWebAPI.Models
{
    public partial class CompanyTb
    {
        public CompanyTb()
        {
            //BillingDetailTbs = new HashSet<BillingDetailTb>();
            //CategoryTbs = new HashSet<CategoryTb>();
            //CompanyUserTbs = new HashSet<CompanyUserTb>();
            //FinancialYearTbs = new HashSet<FinancialYearTb>();
            //GstTbs = new HashSet<GstTb>();
            //ProductTbs = new HashSet<ProductTb>();
        }

        public int CompanyId { get; set; }
        public string? CompanyName { get; set; }
        public string? CompanyAdmin { get; set; }
        public string? CompanyAssociation { get; set; }
        public string? CompanyAddress { get; set; }
        public string? Gstno { get; set; }

        [JsonIgnore]
        public virtual ICollection<BillingDetailTb>? BillingDetailTbs { get; set; }

        [JsonIgnore]
        public virtual ICollection<CategoryTb>? CategoryTbs { get; set; }

        [JsonIgnore]
        public virtual ICollection<CompanyUserTb>? CompanyUserTbs { get; set; }

        [JsonIgnore]
        public virtual ICollection<FinancialYearTb>? FinancialYearTbs { get; set; }

        [JsonIgnore]
        public virtual ICollection<GstTb>? GstTbs { get; set; }

        [JsonIgnore]
        public virtual ICollection<ProductTb>? ProductTbs { get; set; }
    }
}
