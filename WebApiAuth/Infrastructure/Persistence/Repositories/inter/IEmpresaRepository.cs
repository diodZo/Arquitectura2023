﻿using WebApiAuth.Core.Domain.Entities;
using WebApiAuth.Infrastructure.Persistence.Repositories.generic;

namespace WebApiAuth.Infrastructure.Persistence.Repositories.inter
{
    public interface IEmpresaRepository : IGenericRepository<EmpresaEntity>
    {
    }
}
