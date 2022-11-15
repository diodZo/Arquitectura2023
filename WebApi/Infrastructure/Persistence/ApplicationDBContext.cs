using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using WebApi.Core.Domain.Entities;

namespace WebApi.Infrastructure.Persistence
{
    public partial class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Detallestock> Detallestocks { get; set; } = null!;
        public virtual DbSet<LugarEntity> Lugars { get; set; } = null!;
        public virtual DbSet<Producto> Productos { get; set; } = null!;
        public virtual DbSet<Productolugarstock> Productolugarstocks { get; set; } = null!;
        public virtual DbSet<Stock> Stocks { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Detallestock>(entity =>
            {
                entity.HasKey(e => e.Iddetallestock)
                    .HasName("pk_detallestock");

                entity.Property(e => e.Iddetallestock).UseIdentityAlwaysColumn();

                entity.HasOne(d => d.FkstockNavigation)
                    .WithMany(p => p.Detallestocks)
                    .HasForeignKey(d => d.Fkstock)
                    .HasConstraintName("fk_detallestock_stock");
            });

            modelBuilder.Entity<LugarEntity>(entity =>
            {
                entity.HasKey(e => e.Idlugar)
                    .HasName("pk_lugar");

                entity.Property(e => e.Idlugar).UseIdentityAlwaysColumn();
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                entity.HasKey(e => e.Idproducto)
                    .HasName("pk_producto");

                entity.Property(e => e.Idproducto).UseIdentityAlwaysColumn();
            });

            modelBuilder.Entity<Productolugarstock>(entity =>
            {
                entity.HasKey(e => e.Idproductolugarstock)
                    .HasName("pk_productolugarstock");

                entity.Property(e => e.Idproductolugarstock).UseIdentityAlwaysColumn();

                entity.HasOne(d => d.FklugarNavigation)
                    .WithMany(p => p.Productolugarstocks)
                    .HasForeignKey(d => d.Fklugar)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_productolugarstock_lugar");

                entity.HasOne(d => d.FkproductoNavigation)
                    .WithMany(p => p.Productolugarstocks)
                    .HasForeignKey(d => d.Fkproducto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_productolugarstock_producto");

                entity.HasOne(d => d.FkstockNavigation)
                    .WithMany(p => p.Productolugarstocks)
                    .HasForeignKey(d => d.Fkstock)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_productolugarstock_stock");
            });

            modelBuilder.Entity<Stock>(entity =>
            {
                entity.HasKey(e => e.Idstock)
                    .HasName("pk_stock");

                entity.Property(e => e.Idstock).UseIdentityAlwaysColumn();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
