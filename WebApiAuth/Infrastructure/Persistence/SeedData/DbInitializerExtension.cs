using Microsoft.AspNetCore.Identity;
using WebApiAuth.Core.Domain.Entities;
using WebApiAuth.Infrastructure.Persistence;
using WebApiAuth.Infrastructure.SeedData;

internal static class DbInitializerExtension
{
    public async static Task<IApplicationBuilder> UseItToSeedSqlServer(this IApplicationBuilder app)
    {
        ArgumentNullException.ThrowIfNull(app, nameof(app));

        using var scope = app.ApplicationServices.CreateScope();
        var services = scope.ServiceProvider;
        try
        {
            var context = services.GetRequiredService<ApplicationDbContext>();

            var userManager = services.GetRequiredService<UserManager<UserEntity>>();
            var roleManager = services.GetRequiredService<RoleManager<RoleEntity>>();
            await DbInitializer.SeedTablasDiccionarios(context, roleManager);
            await DbInitializer.SeedUsers(context, userManager);
        }
        catch (Exception ex)
        {

        }

        return app;
    }
}