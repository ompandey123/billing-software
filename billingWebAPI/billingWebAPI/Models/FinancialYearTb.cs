using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace billingWebAPI.Models
{
    public partial class FinancialYearTb
    {
        public int YearId { get; set; }
        public int? CompanyId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? IsClosed { get; set; }

        [JsonIgnore]
        public virtual CompanyTb? Company { get; set; }
    }
}
