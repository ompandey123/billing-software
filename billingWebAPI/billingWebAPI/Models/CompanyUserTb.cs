using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace billingWebAPI.Models
{
    public partial class CompanyUserTb
    {
        public int EmpId { get; set; }
        public int? RoleId { get; set; }
        public int? CompanyId { get; set; }

        [JsonIgnore]
        public virtual CompanyTb? Company { get; set; }
        [JsonIgnore]
        public virtual CompanyEmployeeRoleTb? Role { get; set; }
    }
}
