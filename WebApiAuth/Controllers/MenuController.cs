using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SharedLibrary.Infrastructure.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WebApiAuth.Core.Domain.Entities;
using WebApiAuth.Core.Domain.ViewModels;
using WebApiAuth.Core.Services.impl;
using WebApiAuth.Core.Services.inter;
using static SharedLibrary.Infrastructure.Helpers.RolesHelper;

namespace WebApiAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuServices services;

        public MenuController(IMenuServices _services)
        {
            services = _services;
        }

        [HttpGet]
        [Route("GetAll")]
        [AuthorizeRoles(roles.SuperAdmin, roles.Admin)]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var resultado = await services.GetAllAsync();

                if (resultado!.Count <= 0)
                    return NoContent();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return Problem(title: "Ha ocurrido un problema en GetAll()", detail: ex.Message, statusCode: 500);
            }
        }
    }
}
