using WebApiAuth.Infrastructure.Persistence;
using WebApiAuth.Infrastructure.Persistence.Repositories.impl;
using WebApiAuth.Infrastructure.Persistence.Repositories.inter;

namespace WebApiAuth.Core.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext context;

        public UnitOfWork(ApplicationDbContext _context)
        {
            context     = _context;
            Menu        = new MenuRepository(context);
            Comuna      = new ComunaRepository(context);
            Empresa     = new EmpresaRepository(context);
            Provincia   = new ProvinciaRepository(context);
            Region      = new RegionRepository(context);
            RoleClaims  = new RoleClaimsRepository(context);
            Role        = new RoleRepository(context);
            Sistema     = new SistemaRepository(context);
            User        = new UserRepository(context);
            Version     = new VersionRepository(context);
        }

        public IMenuRepository Menu { get; private set; }

        public IComunaRepository Comuna { get; private set; }

        public IEmpresaRepository Empresa { get; private set; }

        public IProvinciaRepository Provincia { get; private set; }

        public IRegionRepository Region { get; private set; }

        public IRoleClaimsRepository RoleClaims { get; private set; }

        public IRoleRepository Role { get; private set; }

        public ISistemaRepository Sistema { get; private set; }

        public IUserRepository User { get; private set; }

        public IVersionRepository Version { get; private set; }

        public void Dispose()
        {
            context.Dispose();
        }

        public int Save() => context.SaveChanges();
    }
}
