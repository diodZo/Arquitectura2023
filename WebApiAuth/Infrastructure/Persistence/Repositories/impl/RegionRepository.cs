using WebApiAuth.Core.Domain.Entities;
using WebApiAuth.Infrastructure.Persistence.Repositories.generic;
using WebApiAuth.Infrastructure.Persistence.Repositories.inter;

namespace WebApiAuth.Infrastructure.Persistence.Repositories.impl
{
    public class RegionRepository : GenericRepository<RegionEntity>, IRegionRepository
    {
        public RegionRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
