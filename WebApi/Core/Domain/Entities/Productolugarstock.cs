using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Core.Domain.Entities
{
    [Table("productolugarstock")]
    public partial class Productolugarstock
    {
        [Key]
        [Column("idproductolugarstock")]
        public int Idproductolugarstock { get; set; }
        [Column("fkproducto")]
        public int Fkproducto { get; set; }
        [Column("fklugar")]
        public int Fklugar { get; set; }
        [Column("fkstock")]
        public int Fkstock { get; set; }
        [Column("estado")]
        public int Estado { get; set; }
        [Column("fkuseringreso")]
        public int? Fkuseringreso { get; set; }
        [Column("fecharegistro", TypeName = "timestamp(3) without time zone")]
        public DateTime? Fecharegistro { get; set; }

        [ForeignKey("Fklugar")]
        [InverseProperty("Productolugarstocks")]
        public virtual LugarEntity FklugarNavigation { get; set; } = null!;
        [ForeignKey("Fkproducto")]
        [InverseProperty("Productolugarstocks")]
        public virtual Producto FkproductoNavigation { get; set; } = null!;
        [ForeignKey("Fkstock")]
        [InverseProperty("Productolugarstocks")]
        public virtual Stock FkstockNavigation { get; set; } = null!;
    }
}
