using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace billingWebAPI.Models
{
    public partial class CompanyEmployeeRoleTb
    {
        public CompanyEmployeeRoleTb()
        {
            //CompanyUserTbs = new HashSet<CompanyUserTb>();
        }

        public int RoleId { get; set; }
        public string? RoleName { get; set; }
        public string? Description { get; set; }

        [JsonIgnore]
        public virtual ICollection<CompanyUserTb>? CompanyUserTbs { get; set; }
    }
}
