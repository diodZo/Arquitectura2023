using WebApiAuth.Core.Domain.Entities;

namespace WebApiAuth.Core.Services.inter
{
    public interface IMenuServices
    {
        Task<MenuEntity> GetByIdAsync(int id);
    }
}
