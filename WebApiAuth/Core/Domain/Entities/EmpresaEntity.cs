using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiAuth.Core.Domain.Entities
{
    [Table("Empresa")]
    public class EmpresaEntity
    {
        [Key]
        public int Id { get; set; }
        public string rut { get; set; }
        public string razonSocial { get; set; }
        public string direccion { get; set; }
        public string telefono { get; set; }
        public string email { get; set; }
        public Nullable<bool> activo { get; set; }
        public string fk_comuna { get; set; }
        public string imagen { get; set; }

        public virtual ComunaEntity comuna { get; set; }
    }
}
