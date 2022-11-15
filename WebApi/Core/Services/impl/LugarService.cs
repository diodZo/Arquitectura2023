using WebApi.Core.Domain.Entities;
using WebApi.Core.Services.inter;
using WebApi.Core.UnitOfWork;

namespace WebApi.Core.Services.impl
{
    public class LugarService: ILugarService
    {

        private readonly IUnitOfWork unitOfWork;
        public LugarService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }


        public async Task<LugarEntity> AddAsync(LugarEntity lugar)
        {
            return await unitOfWork.lugar.AddAsync(lugar);
        }

        public Task<int> CountAsync()
        {
            throw new NotImplementedException();
        }

        public Task<int> DeleteAsync(LugarEntity lugar)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<LugarEntity>> FindAllActiveAsync(bool estado)
        {
            throw new NotImplementedException();
        }

        public IQueryable<LugarEntity> GetAll(string[] including)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<LugarEntity>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<LugarEntity> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<LugarEntity> UpdateAsync(LugarEntity lugar, int id)
        {
            throw new NotImplementedException();
        }
    }
}
