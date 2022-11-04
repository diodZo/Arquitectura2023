using WebApiAuth.Core.Domain.Entities;
using WebApiAuth.Infrastructure.Persistence.Repositories.generic;
using WebApiAuth.Infrastructure.Persistence.Repositories.inter;

namespace WebApiAuth.Infrastructure.Persistence.Repositories.impl
{
    public class RoleClaimsRepository : GenericRepository<RoleClaimsEntity>, IRoleClaimsRepository
    {
        public RoleClaimsRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
