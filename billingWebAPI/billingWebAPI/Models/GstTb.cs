﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace billingWebAPI.Models
{
    public partial class GstTb
    {
        public int GstId { get; set; }
        public int? CompanyId { get; set; }
        public string? Gstno { get; set; }
        public int? Sgst { get; set; }
        public int? Cgst { get; set; }
        public int? Igst { get; set; }
        public int? Pgst { get; set; }

        [JsonIgnore]
        public virtual CompanyTb? Company { get; set; }
    }
}
