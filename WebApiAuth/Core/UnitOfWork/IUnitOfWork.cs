using WebApiAuth.Infrastructure.Persistence.Repositories.inter;

namespace WebApiAuth.Infrastructure.UnitOfWork
{
    public interface IUnitOfWork
    {
        IMenuRepository Menu { get; }
        int Save();
    }
}
