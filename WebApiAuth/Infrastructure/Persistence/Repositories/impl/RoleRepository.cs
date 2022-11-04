using WebApiAuth.Core.Domain.Entities;
using WebApiAuth.Infrastructure.Persistence.Repositories.generic;
using WebApiAuth.Infrastructure.Persistence.Repositories.inter;

namespace WebApiAuth.Infrastructure.Persistence.Repositories.impl
{
    public class RoleRepository : GenericRepository<RoleEntity>, IRoleRepository
    {
        public RoleRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
