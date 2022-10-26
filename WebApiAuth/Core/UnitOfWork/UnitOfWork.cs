using WebApiAuth.Infrastructure.Persistence;
using WebApiAuth.Infrastructure.Persistence.Repositories.impl;
using WebApiAuth.Infrastructure.Persistence.Repositories.inter;

namespace WebApiAuth.Infrastructure.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext context;

        public UnitOfWork(ApplicationDbContext _context)
        {
            this.context = _context;
            Menu = new MenuRepository(this.context);
        }

        public IMenuRepository Menu{get; private set;}

        public void Dispose()
        {
            context.Dispose();
        }

        public int Save()
        {
            return context.SaveChanges();
        }
    }
}
