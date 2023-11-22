using System;
using System.Collections.Generic;

namespace billingWebAPI.Models
{
    public partial class CompanyEmployeeRoleTb
    {
        public CompanyEmployeeRoleTb()
        {
            CompanyUserTbs = new HashSet<CompanyUserTb>();
        }

        public int RoleId { get; set; }
        public string? RoleName { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<CompanyUserTb> CompanyUserTbs { get; set; }
    }
}
