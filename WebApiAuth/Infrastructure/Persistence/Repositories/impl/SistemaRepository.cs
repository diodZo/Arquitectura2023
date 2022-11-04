using WebApiAuth.Core.Domain.Entities;
using WebApiAuth.Infrastructure.Persistence.Repositories.generic;
using WebApiAuth.Infrastructure.Persistence.Repositories.inter;

namespace WebApiAuth.Infrastructure.Persistence.Repositories.impl
{
    public class SistemaRepository : GenericRepository<SistemaEntity>, ISistemaRepository
    {
        public SistemaRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
