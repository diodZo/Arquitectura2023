using Microsoft.AspNetCore.Identity;

namespace WebApiAuth.Core.Domain.Entities
{
    public class RoleClaimsEntity: IdentityRoleClaim<int>
    {
        public int PermisoId { get; set; }
    }
}
