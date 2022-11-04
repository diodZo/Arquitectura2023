using WebApiAuth.Core.Domain.Entities;
using WebApiAuth.Infrastructure.Persistence.Repositories.generic;
using WebApiAuth.Infrastructure.Persistence.Repositories.inter;

namespace WebApiAuth.Infrastructure.Persistence.Repositories.impl
{
    public class ComunaRepository : GenericRepository<ComunaEntity>, IComunaRepository
    {
        public ComunaRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
