using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Core.Domain.ViewModels
{
    public class LugarDTO
    {

        [Column("nombre")]
        [StringLength(50)]
        public string? Nombre { get; set; }
        [Column("estado")]
        [StringLength(50)]
        public string? Estado { get; set; }


    }
}
