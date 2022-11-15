using WebApi.Infrastructure.Persistence.Repositories.inter;

namespace WebApi.Core.UnitOfWork
{
    public interface IUnitOfWork
    {
        ILugarRepository lugar { get; }
    }
}
