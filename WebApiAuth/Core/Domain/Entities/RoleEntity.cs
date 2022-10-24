using Microsoft.AspNetCore.Identity;

namespace WebApiAuth.Core.Domain.Entities
{
    public class RoleEntity : IdentityRole<int>
    {
        public virtual ICollection<UserRoleEntity> UserRoles { get; set; }
    }
}
