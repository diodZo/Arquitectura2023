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

        public async Task<MenuEntity> GetByIdAsync(int id) => await unitOfWork.Menu.GetAsync(id);
    }
}
