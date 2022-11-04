using WebApiAuth.Infrastructure.Persistence.Repositories.inter;

namespace WebApiAuth.Core.UnitOfWork
{
    public interface IUnitOfWork
    {
        IMenuRepository Menu { get; }
        IComunaRepository Comuna { get; }
        IEmpresaRepository Empresa { get; }
        IProvinciaRepository Provincia { get; }
        IRegionRepository Region { get; }
        IRoleClaimsRepository RoleClaims { get; }
        IRoleRepository Role { get; }
        ISistemaRepository Sistema { get; }
        IUserRepository User { get; }
        IVersionRepository Version { get; }
        int Save();
    }
}
