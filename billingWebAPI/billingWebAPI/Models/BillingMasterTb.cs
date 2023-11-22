using System;
using System.Collections.Generic;

namespace billingWebAPI.Models
{
    public partial class BillingMasterTb
    {
        public BillingMasterTb()
        {
            BillingDetailTbs = new HashSet<BillingDetailTb>();
        }

        public int BillingId { get; set; }
        public DateTime? BillingDate { get; set; }
        public int? GrandTotal { get; set; }
        public string? GstNo { get; set; }
        public DateTime? BillDate { get; set; }
        public string? CompanyName { get; set; }

        public virtual ICollection<BillingDetailTb> BillingDetailTbs { get; set; }
    }
}
