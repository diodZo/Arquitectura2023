using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApiAuth.Core.Domain.Entities
{
    [Table("Comuna")]
    public class ComunaEntity
    {

        [Key]
        [Column("cod_comuna")]
        [StringLength(5)]
        public string CodComuna { get; set; } = string.Empty;

        [Column("nombre")]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [StringLength(3)]
        [Column("cod_provincia")]
        public string CodProvincia { get; set; } = string.Empty;

        public virtual ProvinciaEntity Provincia { get; set; }
    }
}
