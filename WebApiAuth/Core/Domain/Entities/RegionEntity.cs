using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApiAuth.Core.Domain.Entities
{
    [Table("Region")]
    public  class RegionEntity
    {
        [Key]
        [Column("cod_region")]
        [StringLength(2)]
        public string CodRegion { get; set; } = string.Empty;


        [Column("nombre")]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;


        public virtual IEnumerable<ProvinciaEntity> Provincia { get; set; }
    }
}
