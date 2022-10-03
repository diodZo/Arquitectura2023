using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Infrastructure.Persistence;

namespace Infrastructure.Persistence
{
    public class ApplicationDBContext : DbContext, IApplicationDBContext
    {
        #region Ctor
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
         : base(options)
        {
        }
        #endregion

        #region DbSet
        public DbSet<AppSetting> AppSettings { get; set; }
        #endregion

        #region Methods
        public Task<int> SaveChangesAsync()
        {
            return base.SaveChangesAsync();
        }
        #endregion
    }
}
