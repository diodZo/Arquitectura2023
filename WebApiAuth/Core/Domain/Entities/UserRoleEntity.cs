using Microsoft.AspNetCore.Identity;
using System.Data;

namespace WebApiAuth.Core.Domain.Entities
{
    public class UserRoleEntity : IdentityUserRole<int>
    {
        public virtual UserEntity User { get; set; }
        public virtual RoleEntity Role { get; set; }
    }
}
