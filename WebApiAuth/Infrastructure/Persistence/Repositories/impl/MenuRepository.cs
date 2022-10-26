using System;
using WebApiAuth.Core.Domain.Entities;
using WebApiAuth.Infrastructure.Persistence.Repositories.generic;
using WebApiAuth.Infrastructure.Persistence.Repositories.inter;

namespace WebApiAuth.Infrastructure.Persistence.Repositories.impl
{
    public class MenuRepository : GenericRepository<MenuEntity>, IMenuRepository
    {
        public MenuRepository(ApplicationDbContext context) : base(context) { }
    }
}
