using WebApiAuth.Core.Domain.Entities;

namespace WebApiAuth.Core.Services.inter
{
    public interface IMenuServices
    {
        Task<MenuEntity> GetByIdAsync(int id);
        Task<MenuEntity> AddAsync(MenuEntity menu);
        Task<MenuEntity> UpdateAsync(MenuEntity menu, int id);
        Task<int> DeleteAsync(MenuEntity menu);
        Task<IEnumerable<MenuEntity>> FindAllActiveAsync(bool estado);
        Task<int> CountAsync();
        Task<ICollection<MenuEntity>> GetAllAsync();
        IQueryable<MenuEntity> GetAll(string[] including);
        IQueryable<MenuEntity> GetAllMenuSystema();
    }
}
