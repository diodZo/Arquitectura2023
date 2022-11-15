using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Core.Domain.Entities
{
    [Table("detallestock")]
    public partial class Detallestock
    {
        [Key]
        [Column("iddetallestock")]
        public int Iddetallestock { get; set; }
        [Column("cantidadtotal")]
        public int? Cantidadtotal { get; set; }
        [Column("cantidadquitar")]
        public int? Cantidadquitar { get; set; }
        [Column("cantidadactual")]
        public int? Cantidadactual { get; set; }
        [Column("fechacambio", TypeName = "timestamp(3) without time zone")]
        public DateTime? Fechacambio { get; set; }
        [Column("estado")]
        public int? Estado { get; set; }
        [Column("fkstock")]
        public int? Fkstock { get; set; }

        [ForeignKey("Fkstock")]
        [InverseProperty("Detallestocks")]
        public virtual Stock? FkstockNavigation { get; set; }
    }
}
