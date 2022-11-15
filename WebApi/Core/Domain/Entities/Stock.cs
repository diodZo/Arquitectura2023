using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Core.Domain.Entities
{
    [Table("stock")]
    public partial class Stock
    {
        public Stock()
        {
            Detallestocks = new HashSet<Detallestock>();
            Productolugarstocks = new HashSet<Productolugarstock>();
        }

        [Key]
        [Column("idstock")]
        public int Idstock { get; set; }
        [Column("cantinicial")]
        public int? Cantinicial { get; set; }
        [Column("fechainicial", TypeName = "timestamp(3) without time zone")]
        public DateTime? Fechainicial { get; set; }
        [Column("cantactual")]
        public int? Cantactual { get; set; }
        [Column("fechacantactual", TypeName = "timestamp(3) without time zone")]
        public DateTime? Fechacantactual { get; set; }
        [Column("estado")]
        public int? Estado { get; set; }

        [InverseProperty("FkstockNavigation")]
        public virtual ICollection<Detallestock> Detallestocks { get; set; }
        [InverseProperty("FkstockNavigation")]
        public virtual ICollection<Productolugarstock> Productolugarstocks { get; set; }
    }
}
