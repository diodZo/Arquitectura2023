using WebApiAuth.Core.Domain.Entities;
using WebApiAuth.Infrastructure.Persistence.Repositories.generic;
using WebApiAuth.Infrastructure.Persistence.Repositories.inter;

namespace WebApiAuth.Infrastructure.Persistence.Repositories.impl
{
    public class ProvinciaRepository : GenericRepository<ProvinciaEntity>, IProvinciaRepository
    {
        public ProvinciaRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
