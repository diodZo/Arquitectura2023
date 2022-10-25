using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiAuth.Core.Domain.Entities
{
    [Table("Menu")]
    public partial class MenuEntity
    {
        [Key]
        public int idMenu { get; set; }

        [StringLength(45)]
        public string name { get; set; }

        [StringLength(150)]
        public string url { get; set; }

        [StringLength(45)]
        public string icon { get; set; }
        public Nullable<int> idsistema { get; set; }
        public Nullable<int> padre { get; set; }
        public Nullable<int> permiso { get; set; }
        public Nullable<bool> estado { get; set; }
        public Nullable<int> orden { get; set; }

        public virtual SistemaEntity Sistema { get; set; }
    }
}
