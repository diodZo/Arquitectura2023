using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiAuth.Core.Domain.Entities
{
    [Table("Sistema")]
    public class SistemaEntity
    {
        public int Id { get; set; }

        [StringLength(150)]
        public string nombre { get; set; }

        [StringLength(450)]
        public string descripcion { get; set; }

        public bool estado { get; set; }

        public virtual IEnumerable<MenuEntity> menu { get; set; }
    }
}
