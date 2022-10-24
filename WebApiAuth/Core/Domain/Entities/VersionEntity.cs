using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApiAuth.Core.Domain.Entities
{
    [Table("Version")]
    public class VersionEntity
    {
        [Key]
        [Column("Id")]
        public short Id { get; set; }

        [Required]
        [Column("version")]
        [StringLength(12)]
        public string version { get; set; } = string.Empty;

        public DateTime FechaCreacion { get; set; }

        [Required]
        [Column("Descripcion")]
        [StringLength(300)]
        public string Descripcion { get; set; } = string.Empty;

        public bool Estado { get; set; }
    }
}
