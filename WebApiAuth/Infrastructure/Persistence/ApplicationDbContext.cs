using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebApiAuth.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Reflection.Emit;

namespace WebApiAuth.Infrastructure.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<UserEntity,
                                                RoleEntity,
                                                int,
                                                IdentityUserClaim<int>,
                                                UserRoleEntity,
                                                IdentityUserLogin<int>,
                                                RoleClaimsEntity,
                                                IdentityUserToken<int>>
    {
        
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public virtual DbSet<RegionEntity> Region { get; set; }
        public virtual DbSet<ProvinciaEntity> Provincia { get; set; }
        public virtual DbSet<ComunaEntity> Comuna { get; set; }
        public virtual DbSet<VersionEntity> Version { get; set; }
        public virtual DbSet<RoleClaimsEntity> RoleClaims { get; set; }
        public virtual DbSet<MenuEntity> Menu { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRoleEntity>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

                userRole.HasOne(ur => ur.User)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();
            });

            builder.Entity<ComunaEntity>(entity =>
            {
                entity.HasKey(e => new { e.CodComuna });

                entity.HasOne(e => e.Provincia)
                .WithMany(r => r.Comuna)
                .HasForeignKey(e => e.CodProvincia)
                .HasConstraintName("FK_Comuna_Provincia")
                .IsRequired();
            });

            builder.Entity<ProvinciaEntity>(entity =>
            {
                entity.HasKey(e => new { e.CodProvincia });

                entity.HasOne(ur => ur.Region)
                   .WithMany(r => r.Provincia)
                   .HasForeignKey(ur => ur.CodRegion)
                   .HasConstraintName("FK_Provincia_Region")
                   .IsRequired();
            });

            builder.Entity<RegionEntity>(entity =>
            {
                entity.HasKey(e => new { e.CodRegion });
            });

            builder.Entity<UserEntity>(entity =>
            {
                entity.HasKey(e => new { e.Id });

                entity.HasOne(ur => ur.Comuna)
                    .WithMany()
                    .HasForeignKey(ur => ur.IdComuna)
                    .HasConstraintName("FK_Usuario_Comuna");
            });

            builder.Entity<MenuEntity>(entity =>
            {
                entity.HasKey(e => new { e.idMenu });

                entity.HasOne(e => e.Sistema)
                .WithMany(r => r.menu)
                .HasForeignKey(e => e.idsistema)
                .HasConstraintName("FK_Menu_Sistema")
                .IsRequired();
            });

        }
    }
}
