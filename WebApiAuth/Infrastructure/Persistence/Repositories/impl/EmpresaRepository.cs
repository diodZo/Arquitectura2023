using WebApiAuth.Core.Domain.Entities;
using WebApiAuth.Infrastructure.Persistence.Repositories.generic;
using WebApiAuth.Infrastructure.Persistence.Repositories.inter;

namespace WebApiAuth.Infrastructure.Persistence.Repositories.impl
{
    public class EmpresaRepository : GenericRepository<EmpresaEntity>, IEmpresaRepository
    {
        public EmpresaRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
