using WebApiAuth.Infrastructure.Persistence.Repositories.inter;

namespace WebApiAuth.Core.UnitOfWork
{
    public interface IUnitOfWork
    {
        IMenuRepository Menu { get; }
        int Save();
    }
}
