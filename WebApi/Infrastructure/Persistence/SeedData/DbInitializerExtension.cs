using WebApi.Infrastructure.Persistence;

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
        }
        catch (Exception ex)
        {

        }

        return app;
    }
}