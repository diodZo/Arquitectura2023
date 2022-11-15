using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Core.Domain.Entities
{
    [Table("producto")]
    public partial class Producto
    {
        public Producto()
        {
            Productolugarstocks = new HashSet<Productolugarstock>();
        }

        [Key]
        [Column("idproducto")]
        public int Idproducto { get; set; }
        [Column("desccripcion")]
        [StringLength(50)]
        public string? Desccripcion { get; set; }
        [Column("nombre")]
        [StringLength(50)]
        public string? Nombre { get; set; }
        [Column("imagen")]
        [StringLength(50)]
        public string? Imagen { get; set; }
        [Column("precioinicial")]
        public int? Precioinicial { get; set; }
        [Column("estado")]
        public int? Estado { get; set; }
        [Column("fechaingreso", TypeName = "timestamp(3) without time zone")]
        public DateTime? Fechaingreso { get; set; }
        [Column("fkempresa")]
        public int? Fkempresa { get; set; }
        [Column("fkuseringreso")]
        public int? Fkuseringreso { get; set; }

        [InverseProperty("FkproductoNavigation")]
        public virtual ICollection<Productolugarstock> Productolugarstocks { get; set; }
    }
}
