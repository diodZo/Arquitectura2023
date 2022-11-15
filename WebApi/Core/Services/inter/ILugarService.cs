using WebApi.Core.Domain.Entities;

namespace WebApi.Core.Services.inter
{
    public interface ILugarService
    {
        Task<LugarEntity> GetByIdAsync(int id);
        Task<LugarEntity> AddAsync(LugarEntity lugar);
        Task<LugarEntity> UpdateAsync(LugarEntity lugar, int id);
        Task<int> DeleteAsync(LugarEntity lugar);
        Task<IEnumerable<LugarEntity>> FindAllActiveAsync(bool estado);
        Task<int> CountAsync();
        Task<ICollection<LugarEntity>> GetAllAsync();
        IQueryable<LugarEntity> GetAll(string[] including);
        
    }
}
