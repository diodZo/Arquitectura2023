using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using WebApi.Core.Domain.Entities;
using WebApi.Core.Domain.ViewModels;
using WebApi.Core.Services.inter;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LugarController : ControllerBase
    {
        private ILugarService service;

        public LugarController(ILugarService _lugarService)
        {
            service = _lugarService;
        }

        [HttpPost]
        public async Task<IActionResult> GetAllByDates([FromBody] LugarDTO lugar)
        {
            try
            {

                LugarEntity lugarnew = new LugarEntity()
                { 
                    Nombre = lugar.Nombre,
                    Estado = lugar.Estado,                    
                };

                var resultData = await service.AddAsync(lugarnew);


                return Ok(resultData);
            }
            catch (System.Exception ex)
            {

                return Problem(title: "Ha ocurrido un problema en GetAll()", detail: ex.Message, statusCode: 500);
            }
        }



    }
}
