using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Core.Domain.Entities
{
    [Table("lugar")]
    public partial class LugarEntity
    {
        public LugarEntity()
        {
            Productolugarstocks = new HashSet<Productolugarstock>();
        }

        [Key]
        [Column("idlugar")]
        public int Idlugar { get; set; }
        [Column("nombre")]
        [StringLength(50)]
        public string? Nombre { get; set; }
        [Column("estado")]
        [StringLength(50)]
        public string? Estado { get; set; }

        [InverseProperty("FklugarNavigation")]
        public virtual ICollection<Productolugarstock> Productolugarstocks { get; set; }
    }
}
