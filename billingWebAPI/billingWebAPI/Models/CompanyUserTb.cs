using System;
using System.Collections.Generic;

namespace billingWebAPI.Models
{
    public partial class CompanyUserTb
    {
        public int EmpId { get; set; }
        public int? RoleId { get; set; }
        public int? CompanyId { get; set; }

        public virtual CompanyTb? Company { get; set; }
        public virtual CompanyEmployeeRoleTb? Role { get; set; }
    }
}
