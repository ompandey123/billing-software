using System;
using System.Collections.Generic;

namespace billingWebAPI.Models
{
    public partial class BillTb
    {
        public int BillId { get; set; }
        public int? ProductId { get; set; }
        public string? Username { get; set; }
        public int? TotalCost { get; set; }
        public int? Tax { get; set; }
        public double? GrandTotal { get; set; }
        public int? Quantity { get; set; }
    }
}
