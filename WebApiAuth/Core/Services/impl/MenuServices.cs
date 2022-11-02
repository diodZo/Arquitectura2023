using System.Linq.Expressions;
using WebApiAuth.Core.Domain.Entities;
using WebApiAuth.Core.Services.inter;
using WebApiAuth.Infrastructure.UnitOfWork;

namespace WebApiAuth.Core.Services.impl
{
    public class MenuServices : IMenuServices
    {
        private readonly IUnitOfWork unitOfWork;

        public MenuServices(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        public async Task<MenuEntity> GetByIdAsync(int id)                          => await unitOfWork.Menu.GetAsync(id);
        public async Task<MenuEntity> AddAsync(MenuEntity menu)                     => await unitOfWork.Menu.AddAsync(menu);
        public async Task<MenuEntity> UpdateAsync(MenuEntity menu, int id)          => await unitOfWork.Menu.UpdateAsync(menu, id);
        public async Task<int> DeleteAsync(MenuEntity menu)                         => await unitOfWork.Menu.DeleteAsync(menu);
        public async Task<IEnumerable<MenuEntity>> FindAllActiveAsync(bool estado)  => await unitOfWork.Menu.FindAllAsync(x => x.estado == estado);
        public async Task<int> CountAsync()                                         => await unitOfWork.Menu.CountAsync();
        public async Task<ICollection<MenuEntity>> GetAllAsync()                    => await unitOfWork.Menu.GetAllAsync();
        public IQueryable<MenuEntity> GetAll(string[] including)                    => unitOfWork.Menu.GetAll(including);
        public IQueryable<MenuEntity> GetAllMenuSystema()                           => unitOfWork.Menu.GetAll(x => x.Sistema);
    }
}
