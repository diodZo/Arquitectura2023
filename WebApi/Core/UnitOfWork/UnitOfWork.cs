using WebApi.Infrastructure.Persistence;
using WebApi.Infrastructure.Persistence.Repositories.impl;
using WebApi.Infrastructure.Persistence.Repositories.inter;

namespace WebApi.Core.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext context;

        public UnitOfWork(ApplicationDbContext _context)
        {
            context = _context;
            lugar = new LugarRepository(context);
          
        }
        public ILugarRepository lugar { get; private set; }

        public void Dispose()
        {
            context.Dispose();
        }

   
    }
}
