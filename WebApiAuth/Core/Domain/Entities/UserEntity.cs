using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApiAuth.Core.Domain.Entities
{
    public class UserEntity : IdentityUser<int>
    {

        [Required]
        [StringLength(250)]
        public string Nombres { get; set; } = string.Empty;

        [Required]
        [StringLength(250)]
        [Column("Apellido_Paterno")]
        public string ApellidoPaterno { get; set; } = string.Empty;

        [Required]
        [StringLength(250)]
        [Column("Apellido_Materno")]
        public string ApellidoMaterno { get; set; } = string.Empty;


        [Column("Fecha_Nacimiento")]
        public DateTime? FechaDeNacimiento { get; set; }


        [StringLength(500)]
        public string Direccion { get; set; } = string.Empty;

        [StringLength(5)]
        public string IdComuna { get; set; } = string.Empty;

        [StringLength(300)]
        public string Imagen { get; set; } = string.Empty;

        public bool userLogin { get; set; }

        public virtual ComunaEntity Comuna { get; set; }
        public virtual ICollection<UserRoleEntity> UserRoles { get; set; }
    }
}
