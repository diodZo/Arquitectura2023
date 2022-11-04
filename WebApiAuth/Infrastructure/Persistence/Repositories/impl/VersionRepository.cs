using WebApiAuth.Core.Domain.Entities;
using WebApiAuth.Infrastructure.Persistence.Repositories.generic;
using WebApiAuth.Infrastructure.Persistence.Repositories.inter;

namespace WebApiAuth.Infrastructure.Persistence.Repositories.impl
{
    public class VersionRepository : GenericRepository<VersionEntity>, IVersionRepository
    {
        public VersionRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
