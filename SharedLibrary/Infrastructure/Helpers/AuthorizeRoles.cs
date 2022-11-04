using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static SharedLibrary.Infrastructure.Helpers.RolesHelper;

namespace SharedLibrary.Infrastructure.Helpers
{

    public class AuthorizeRolesAttribute : AuthorizeAttribute
    {
        public AuthorizeRolesAttribute(params roles[] allowedRoles)
        {
            var allowedRolesAsStrings = allowedRoles.Select(x => Enum.GetName(typeof(roles), x));
            Roles = string.Join(",", allowedRolesAsStrings);
        }
    }
}
