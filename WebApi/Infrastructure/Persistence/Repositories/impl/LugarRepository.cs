using WebApi.Core.Domain.Entities;
using WebApi.Infrastructure.Persistence.Repositories.generic;
using WebApi.Infrastructure.Persistence.Repositories.inter;

namespace WebApi.Infrastructure.Persistence.Repositories.impl
{
    public class LugarRepository : GenericRepository<LugarEntity>, ILugarRepository
    {

        public LugarRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
