using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApiAuth.Core.Domain.Entities
{
    [Table("Provincia")]
    public class ProvinciaEntity
    {
        [Key]
        [Column("cod_provincia")]
        [StringLength(3)]
        public string CodProvincia { get; set; } = string.Empty;

        [Column("nombre")]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [StringLength(2)]
        [Column("cod_region")]
        public string CodRegion { get; set; } = string.Empty;

        public virtual RegionEntity Region { get; set; }

        public virtual IEnumerable<ComunaEntity> Comuna { get; set; }
    }
}
