using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SharedLibrary.Infrastructure.Helpers;
using System.Data;
using WebApiAuth.Core.Domain.Entities;

namespace WebApiAuth.Infrastructure.Persistence.SeedData
{
    internal class DbInitializer
    {
        internal async static Task SeedUsers(ApplicationDbContext dbContext, UserManager<UserEntity> userManager)
        {
            try
            {
                ArgumentNullException.ThrowIfNull(dbContext, nameof(dbContext));
                dbContext.Database.EnsureCreated();

                if (!userManager.Users.Any())
                {
                    var SuperAdmin = new UserEntity
                    {
                        UserName = "Deuzti.SuperAdmin",
                        NormalizedUserName = "Deuzti Super Administrador",
                        Email = "superadmin@deuz.cl",
                        PhoneNumber = "+56911111111",
                        Nombres = "Super Admin",
                        ApellidoPaterno = "Deuz",
                        ApellidoMaterno = "TI",
                        FechaDeNacimiento = DateTime.UtcNow,
                        Direccion = "Deuz Central",
                        IdComuna = "06201",
                        Imagen = string.Empty,
                        userLogin = false,
                        IdEmpresa = 1
                    };

                    var Admin = new UserEntity
                    {
                        UserName = "Deuzti.Supervisor",
                        NormalizedUserName = "Deuzti Supervisor",
                        Email = "Supervisor@deuz.cl",
                        PhoneNumber = "+56911111111",
                        Nombres = "Supervisor Admin",
                        ApellidoPaterno = "Deuz",
                        ApellidoMaterno = "TI",
                        FechaDeNacimiento = DateTime.UtcNow,
                        Direccion = "Deuz Central",
                        IdComuna = "06201",
                        Imagen = string.Empty,
                        userLogin = false,
                        IdEmpresa = 1
                    };

                    var Vendedor = new UserEntity
                    {
                        UserName = "Deuzti.Vendedor",
                        NormalizedUserName = "Deuzti Vendedor",
                        Email = "Vendedor@deuz.cl",
                        PhoneNumber = "+56911111111",
                        Nombres = "Vendedor",
                        ApellidoPaterno = "Deuz",
                        ApellidoMaterno = "TI",
                        FechaDeNacimiento = DateTime.UtcNow,
                        Direccion = "Deuz Central",
                        IdComuna = "06201",
                        Imagen = string.Empty,
                        userLogin = false,
                        IdEmpresa = 1
                    };

                    var Usuario = new UserEntity
                    {
                        UserName = "Deuzti.Usuario",
                        NormalizedUserName = "Deuzti Vendedor",
                        Email = "Usuario@deuz.cl",
                        PhoneNumber = "+56911111111",
                        Nombres = "Usuario",
                        ApellidoPaterno = "Deuz",
                        ApellidoMaterno = "TI",
                        FechaDeNacimiento = DateTime.UtcNow,
                        Direccion = "Deuz Central",
                        IdComuna = "06201",
                        Imagen = string.Empty,
                        userLogin = false,
                        IdEmpresa = 1
                    };

                    var result = await userManager.CreateAsync(SuperAdmin, "D3uzTI@2023");

                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(SuperAdmin, "SuperAdmin");
                    }

                    var result1 = await userManager.CreateAsync(Admin, "D3uzTI@2023");

                    if (result1.Succeeded)
                    {
                        await userManager.AddToRoleAsync(Admin, "Admin");
                    }

                    var result2 = await userManager.CreateAsync(Vendedor, "D3uzTI@2023");

                    if (result2.Succeeded)
                    {
                        await userManager.AddToRoleAsync(Vendedor, "Vendedor");
                    }

                    var result3 = await userManager.CreateAsync(Usuario, "D3uzTI@2023");

                    if (result3.Succeeded)
                    {
                        await userManager.AddToRoleAsync(Usuario, "Usuario");
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        internal async static Task SeedTablasDiccionarios(ApplicationDbContext context, RoleManager<RoleEntity> roleManager)
        {
            DbInitializer page = new DbInitializer();

            if (!roleManager.Roles.Any())
            {
                using (var dbContextTransaction = context.Database.BeginTransaction())
                {
                    var roles = new List<RoleEntity>
                    {
                        new RoleEntity{Name = "SuperAdmin"},
                        new RoleEntity{Name = "Admin"},
                        new RoleEntity{Name = "Supervisor"},
                        new RoleEntity{Name = "Vendedor"},
                        new RoleEntity{Name = "Usuario"},
                    };

                    for (int i = 0; i < roles.Count; i++)
                    {
                        roleManager.CreateAsync(roles[i]).Wait();
                    }
                    await context.SaveChangesAsync();
                    dbContextTransaction.Commit();
                }
            }

            if (!context.Region.Any())
            {
                using (var dbContextTransaction = context.Database.BeginTransaction())
                {
                    var region = new List<RegionEntity>
                    {
                            new RegionEntity { Nombre = "Tarapacá", CodRegion = "01"},
                            new RegionEntity { Nombre = "Antofagasta", CodRegion = "02" },
                            new RegionEntity { Nombre = "Atacama", CodRegion = "03" },
                            new RegionEntity { Nombre = "Coquimbo", CodRegion = "04" },
                            new RegionEntity { Nombre = "Valparaíso", CodRegion = "05" },
                            new RegionEntity { Nombre = "Región del Libertador Gral. Bernardo O’Higgins", CodRegion = "06" },
                            new RegionEntity { Nombre = "Región del Maule", CodRegion = "07" },
                            new RegionEntity { Nombre = "Región del Biobío", CodRegion = "08" },
                            new RegionEntity { Nombre = "Región de la Araucanía", CodRegion = "09" },
                            new RegionEntity { Nombre = "Región de Los Lagos", CodRegion = "10" },
                            new RegionEntity { Nombre = "Región Aisén del Gral. Carlos Ibáñez del Campo", CodRegion = "11" },
                            new RegionEntity { Nombre = "Región de Magallanes y de la Antártica Chilena", CodRegion = "12" },
                            new RegionEntity { Nombre = "Región Metropolitana de Santiago", CodRegion = "13" },
                            new RegionEntity { Nombre = "Región de Los Ríos", CodRegion = "14" },
                            new RegionEntity { Nombre = "Arica y Parinacota", CodRegion = "15" }
                    };

                    await context.AddRangeAsync(region);
                    await context.SaveChangesAsync();
                    dbContextTransaction.Commit();
                }
            }

            if (!context.Provincia.Any())
            {
                using (var dbContextTransaction = context.Database.BeginTransaction())
                {
                    var provincias = new List<ProvinciaEntity>
                    {
                            new ProvinciaEntity {Nombre= "Arica", CodProvincia = "151", CodRegion="15"},
                            new ProvinciaEntity {Nombre= "Parinacota", CodProvincia = "152", CodRegion="15"},
                            new ProvinciaEntity {Nombre= "Iquique", CodProvincia = "011", CodRegion="01"},
                            new ProvinciaEntity {Nombre= "Tamarugal", CodProvincia = "014", CodRegion="01"},
                            new ProvinciaEntity {Nombre= "Antofagasta", CodProvincia = "021", CodRegion="02"},
                            new ProvinciaEntity {Nombre= "El Loa", CodProvincia = "022", CodRegion="02"},
                            new ProvinciaEntity {Nombre= "Tocopilla", CodProvincia = "023", CodRegion="02"},
                            new ProvinciaEntity {Nombre= "Copiapó", CodProvincia = "031", CodRegion="03"},
                            new ProvinciaEntity {Nombre= "Chañaral", CodProvincia = "032", CodRegion="03"},
                            new ProvinciaEntity {Nombre= "Huasco", CodProvincia = "033", CodRegion="03"},
                            new ProvinciaEntity {Nombre= "Elqui", CodProvincia = "041", CodRegion="04"},
                            new ProvinciaEntity {Nombre= "Choapa", CodProvincia = "042", CodRegion="04"},
                            new ProvinciaEntity {Nombre= "Limarí", CodProvincia = "043", CodRegion="04"},
                            new ProvinciaEntity {Nombre= "Valparaíso", CodProvincia = "051", CodRegion="05"},
                            new ProvinciaEntity {Nombre= "Isla de Pascua", CodProvincia = "052", CodRegion="05"},
                            new ProvinciaEntity {Nombre= "Los Andes", CodProvincia = "053", CodRegion="05"},
                            new ProvinciaEntity {Nombre= "Petorca", CodProvincia = "054", CodRegion="05"},
                            new ProvinciaEntity {Nombre= "Quillota", CodProvincia = "055", CodRegion="05"},
                            new ProvinciaEntity {Nombre= "San Antonio", CodProvincia = "056", CodRegion="05"},
                            new ProvinciaEntity {Nombre= "San Felipe de Aconcagua", CodProvincia = "057", CodRegion="05"},
                            new ProvinciaEntity {Nombre= "Marga Marga", CodProvincia = "058", CodRegion="05"},
                            new ProvinciaEntity {Nombre= "Cachapoal", CodProvincia = "061", CodRegion="06"},
                            new ProvinciaEntity {Nombre= "Cardenal Caro", CodProvincia = "062", CodRegion="06"},
                            new ProvinciaEntity {Nombre= "Colchagua", CodProvincia = "063", CodRegion="06"},
                            new ProvinciaEntity {Nombre= "Talca", CodProvincia = "071", CodRegion="07"},
                            new ProvinciaEntity {Nombre= "Cauquenes", CodProvincia = "072", CodRegion="07"},
                            new ProvinciaEntity {Nombre= "Curicó", CodProvincia = "073", CodRegion="07"},
                            new ProvinciaEntity {Nombre= "Linares", CodProvincia = "074", CodRegion="07"},
                            new ProvinciaEntity {Nombre= "Concepción", CodProvincia = "081", CodRegion="08"},
                            new ProvinciaEntity {Nombre= "Arauco", CodProvincia = "082", CodRegion="08"},
                            new ProvinciaEntity {Nombre= "Biobío", CodProvincia = "083", CodRegion="08"},
                            new ProvinciaEntity {Nombre= "Ñuble", CodProvincia = "084", CodRegion="08"},
                            new ProvinciaEntity {Nombre= "Cautín", CodProvincia = "091", CodRegion="09"},
                            new ProvinciaEntity {Nombre= "Malleco", CodProvincia = "092", CodRegion="09"},
                            new ProvinciaEntity {Nombre= "Llanquihue", CodProvincia = "101", CodRegion="10"},
                            new ProvinciaEntity {Nombre= "Chiloé", CodProvincia = "102", CodRegion="10"},
                            new ProvinciaEntity {Nombre= "Osorno", CodProvincia = "103", CodRegion="10"},
                            new ProvinciaEntity {Nombre= "Palena", CodProvincia = "104", CodRegion="10"},
                            new ProvinciaEntity {Nombre= "Coihaique", CodProvincia = "111", CodRegion="11"},
                            new ProvinciaEntity {Nombre= "Aisén", CodProvincia = "112", CodRegion="11"},
                            new ProvinciaEntity {Nombre= "Capitán Prat", CodProvincia = "113", CodRegion="11"},
                            new ProvinciaEntity {Nombre= "General Carrera", CodProvincia = "114", CodRegion="11"},
                            new ProvinciaEntity {Nombre= "Magallanes", CodProvincia = "121", CodRegion="12"},
                            new ProvinciaEntity {Nombre= "Antártica Chilena", CodProvincia = "122", CodRegion="12"},
                            new ProvinciaEntity {Nombre= "Tierra del Fuego", CodProvincia = "123", CodRegion="12"},
                            new ProvinciaEntity {Nombre= "Última Esperanza", CodProvincia = "124", CodRegion="12"},
                            new ProvinciaEntity {Nombre= "Santiago", CodProvincia = "131", CodRegion="13"},
                            new ProvinciaEntity {Nombre= "Cordillera", CodProvincia = "132", CodRegion="13"},
                            new ProvinciaEntity {Nombre= "Chacabuco", CodProvincia = "133", CodRegion="13"},
                            new ProvinciaEntity {Nombre= "Maipo", CodProvincia = "134", CodRegion="13"},
                            new ProvinciaEntity {Nombre= "Melipilla", CodProvincia = "135", CodRegion="13"},
                            new ProvinciaEntity {Nombre= "Talagante", CodProvincia = "136", CodRegion="13"},
                            new ProvinciaEntity {Nombre= "Valdivia", CodProvincia = "141", CodRegion="14"},
                            new ProvinciaEntity {Nombre= "Ranco", CodProvincia = "142", CodRegion="14"},

                    };

                    context.AddRange(provincias);
                    await context.SaveChangesAsync();
                    dbContextTransaction.Commit();
                }
            }

            if (!context.Comuna.Any())
            {
                using (var dbContextTransaction = context.Database.BeginTransaction())
                {
                    var zonas = new List<ComunaEntity>
                    {
                        new ComunaEntity {Nombre="Antofagasta", CodComuna="02101", CodProvincia="021"},
                        new ComunaEntity {Nombre="Mejillones", CodComuna="02102", CodProvincia="021"},
                        new ComunaEntity {Nombre="Sierra Gorda", CodComuna="02103", CodProvincia="021"},
                        new ComunaEntity {Nombre="Taltal", CodComuna="02104", CodProvincia="021"},
                        new ComunaEntity {Nombre="Calama", CodComuna="02201", CodProvincia="022"},
                        new ComunaEntity {Nombre="Ollagüe", CodComuna="02202", CodProvincia="022"},
                        new ComunaEntity {Nombre="Copiapó", CodComuna="03101", CodProvincia="031"},
                        new ComunaEntity {Nombre="Caldera", CodComuna="03102", CodProvincia="031"},
                        new ComunaEntity {Nombre="Tierra Amarilla", CodComuna="03103", CodProvincia="031"},
                        new ComunaEntity {Nombre="Chañaral", CodComuna="03201", CodProvincia="032"},
                        new ComunaEntity {Nombre="Diego de Almagro", CodComuna="03202", CodProvincia="032"},
                        new ComunaEntity {Nombre="Vallenar", CodComuna="03301", CodProvincia="033"},
                        new ComunaEntity {Nombre="Alto del Carmen", CodComuna="03302", CodProvincia="033"},
                        new ComunaEntity {Nombre="Huasco", CodComuna="03304", CodProvincia="033"},
                        new ComunaEntity {Nombre="La Serena", CodComuna="04101", CodProvincia="041"},
                        new ComunaEntity {Nombre="Coquimbo", CodComuna="04102", CodProvincia="041"},
                        new ComunaEntity {Nombre="Andacollo", CodComuna="04103", CodProvincia="041"},
                        new ComunaEntity {Nombre="La Higuera", CodComuna="04104", CodProvincia="041"},
                        new ComunaEntity {Nombre="Paiguano", CodComuna="04105", CodProvincia="041"},
                        new ComunaEntity {Nombre="Vicuña", CodComuna="04106", CodProvincia="041"},
                        new ComunaEntity {Nombre="Illapel", CodComuna="04201", CodProvincia="042"},
                        new ComunaEntity {Nombre="Valparaíso", CodComuna="05101", CodProvincia="051"},
                        new ComunaEntity {Nombre="Casablanca", CodComuna="05102", CodProvincia="051"},
                        new ComunaEntity {Nombre="Concón", CodComuna="05103", CodProvincia="051"},
                        new ComunaEntity {Nombre="Juan Fernández", CodComuna="05104", CodProvincia="051"},
                        new ComunaEntity {Nombre="Puchuncaví", CodComuna="05105", CodProvincia="051"},
                        new ComunaEntity {Nombre="Quintero", CodComuna="05107", CodProvincia="051"},
                        new ComunaEntity {Nombre="Castro", CodComuna="10201", CodProvincia="102"},
                        new ComunaEntity {Nombre="Ancud", CodComuna="10202", CodProvincia="102"},
                        new ComunaEntity {Nombre="Chonchi", CodComuna="10203", CodProvincia="102"},
                        new ComunaEntity {Nombre="Curaco de Vélez", CodComuna="10204", CodProvincia="102"},
                        new ComunaEntity {Nombre="Dalcahue", CodComuna="10205", CodProvincia="102"},
                        new ComunaEntity {Nombre="Puqueldón", CodComuna="10206", CodProvincia="102"},
                        new ComunaEntity {Nombre="Queilén", CodComuna="10207", CodProvincia="102"},
                        new ComunaEntity {Nombre="Quellón", CodComuna="10208", CodProvincia="102"},
                        new ComunaEntity {Nombre="Quemchi", CodComuna="10209", CodProvincia="102"},
                        new ComunaEntity {Nombre="Quinchao", CodComuna="10210", CodProvincia="102"},
                        new ComunaEntity {Nombre="Osorno", CodComuna="10301", CodProvincia="103"},
                        new ComunaEntity {Nombre="Puerto Octay", CodComuna="10302", CodProvincia="103"},
                        new ComunaEntity {Nombre="Purranque", CodComuna="10303", CodProvincia="103"},
                        new ComunaEntity {Nombre="Puyehue", CodComuna="10304", CodProvincia="103"},
                        new ComunaEntity {Nombre="Río Negro", CodComuna="10305", CodProvincia="103"},
                        new ComunaEntity {Nombre="Peñalolén", CodComuna="13122", CodProvincia="131"},
                        new ComunaEntity {Nombre="Viña del Mar", CodComuna="05109", CodProvincia="051"},
                        new ComunaEntity {Nombre="Isla de Pascua", CodComuna="05201", CodProvincia="052"},
                        new ComunaEntity {Nombre="Los Andes", CodComuna="05301", CodProvincia="053"},
                        new ComunaEntity {Nombre="Calle Larga", CodComuna="05302", CodProvincia="053"},
                        new ComunaEntity {Nombre="Rinconada", CodComuna="05303", CodProvincia="053"},
                        new ComunaEntity {Nombre="San Esteban", CodComuna="05304", CodProvincia="053"},
                        new ComunaEntity {Nombre="Rancagua", CodComuna="06101", CodProvincia="061"},
                        new ComunaEntity {Nombre="Codegua", CodComuna="06102", CodProvincia="061"},
                        new ComunaEntity {Nombre="Coinco", CodComuna="06103", CodProvincia="061"},
                        new ComunaEntity {Nombre="Coltauco", CodComuna="06104", CodProvincia="061"},
                        new ComunaEntity {Nombre="Doñihue", CodComuna="06105", CodProvincia="061"},
                        new ComunaEntity {Nombre="Graneros", CodComuna="06106", CodProvincia="061"},
                        new ComunaEntity {Nombre="Las Cabras", CodComuna="06107", CodProvincia="061"},
                        new ComunaEntity {Nombre="Machalí", CodComuna="06108", CodProvincia="061"},
                        new ComunaEntity {Nombre="Malloa", CodComuna="06109", CodProvincia="061"},
                        new ComunaEntity {Nombre="Mostazal", CodComuna="06110", CodProvincia="061"},
                        new ComunaEntity {Nombre="Olivar", CodComuna="06111", CodProvincia="061"},
                        new ComunaEntity {Nombre="Peumo", CodComuna="06112", CodProvincia="061"},
                        new ComunaEntity {Nombre="Pichidegua", CodComuna="06113", CodProvincia="061"},
                        new ComunaEntity {Nombre="Quinta de Tilcoco", CodComuna="06114", CodProvincia="061"},
                        new ComunaEntity {Nombre="Rengo", CodComuna="06115", CodProvincia="061"},
                        new ComunaEntity {Nombre="Requínoa", CodComuna="06116", CodProvincia="061"},
                        new ComunaEntity {Nombre="San Vicente", CodComuna="06117", CodProvincia="061"},
                        new ComunaEntity {Nombre="Puerto Montt", CodComuna="10101", CodProvincia="101"},
                        new ComunaEntity {Nombre="Calbuco", CodComuna="10102", CodProvincia="101"},
                        new ComunaEntity {Nombre="Cochamó", CodComuna="10103", CodProvincia="101"},
                        new ComunaEntity {Nombre="Fresia", CodComuna="10104", CodProvincia="101"},
                        new ComunaEntity {Nombre="Frutillar", CodComuna="10105", CodProvincia="101"},
                        new ComunaEntity {Nombre="Los Muermos", CodComuna="10106", CodProvincia="101"},
                        new ComunaEntity {Nombre="Llanquihue", CodComuna="10107", CodProvincia="101"},
                        new ComunaEntity {Nombre="Maullín", CodComuna="10108", CodProvincia="101"},
                        new ComunaEntity {Nombre="Puerto Varas", CodComuna="10109", CodProvincia="101"},
                        new ComunaEntity {Nombre="Pichilemu", CodComuna="06201", CodProvincia="062"},
                        new ComunaEntity {Nombre="La Estrella", CodComuna="06202", CodProvincia="062"},
                        new ComunaEntity {Nombre="Litueche", CodComuna="06203", CodProvincia="062"},
                        new ComunaEntity {Nombre="Marchihue", CodComuna="06204", CodProvincia="062"},
                        new ComunaEntity {Nombre="Navidad", CodComuna="06205", CodProvincia="062"},
                        new ComunaEntity {Nombre="Paredones", CodComuna="06206", CodProvincia="062"},
                        new ComunaEntity {Nombre="Iquique", CodComuna="01101", CodProvincia="011"},
                        new ComunaEntity {Nombre="San Pedro de Atacama", CodComuna="02203", CodProvincia="022"},
                        new ComunaEntity {Nombre="Bulnes", CodComuna="08402", CodProvincia="084"},
                        new ComunaEntity {Nombre="Temuco", CodComuna="09101", CodProvincia="091"},
                        new ComunaEntity {Nombre="Chaitén", CodComuna="10401", CodProvincia="104"},
                        new ComunaEntity {Nombre="Futaleufú", CodComuna="10402", CodProvincia="104"},
                        new ComunaEntity {Nombre="Hualaihué", CodComuna="10403", CodProvincia="104"},
                        new ComunaEntity {Nombre="Pedro Aguirre Cerda", CodComuna="13121", CodProvincia="131"},
                        new ComunaEntity {Nombre="Providencia", CodComuna="13123", CodProvincia="131"},
                        new ComunaEntity {Nombre="Pudahuel", CodComuna="13124", CodProvincia="131"},
                        new ComunaEntity {Nombre="Quilicura", CodComuna="13125", CodProvincia="131"},
                        new ComunaEntity {Nombre="Quinta Normal", CodComuna="13126", CodProvincia="131"},
                        new ComunaEntity {Nombre="Recoleta", CodComuna="13127", CodProvincia="131"},
                        new ComunaEntity {Nombre="Renca", CodComuna="13128", CodProvincia="131"},
                        new ComunaEntity {Nombre="San Joaquín", CodComuna="13129", CodProvincia="131"},
                        new ComunaEntity {Nombre="San Miguel", CodComuna="13130", CodProvincia="131"},
                        new ComunaEntity {Nombre="San Ramón", CodComuna="13131", CodProvincia="131"},
                        new ComunaEntity {Nombre="Vitacura", CodComuna="13132", CodProvincia="131"},
                        new ComunaEntity {Nombre="Puente Alto", CodComuna="13201", CodProvincia="132"},
                        new ComunaEntity {Nombre="Pirque", CodComuna="13202", CodProvincia="132"},
                        new ComunaEntity {Nombre="San José de Maipo", CodComuna="13203", CodProvincia="132"},
                        new ComunaEntity {Nombre="Colina", CodComuna="13301", CodProvincia="133"},
                        new ComunaEntity {Nombre="Lampa", CodComuna="13302", CodProvincia="133"},
                        new ComunaEntity {Nombre="Tiltil", CodComuna="13303", CodProvincia="133"},
                        new ComunaEntity {Nombre="San Bernardo", CodComuna="13401", CodProvincia="134"},
                        new ComunaEntity {Nombre="Buin", CodComuna="13402", CodProvincia="134"},
                        new ComunaEntity {Nombre="Calera de Tango", CodComuna="13403", CodProvincia="134"},
                        new ComunaEntity {Nombre="Paine", CodComuna="13404", CodProvincia="134"},
                        new ComunaEntity {Nombre="Melipilla", CodComuna="13501", CodProvincia="135"},
                        new ComunaEntity {Nombre="Alhué", CodComuna="13502", CodProvincia="135"},
                        new ComunaEntity {Nombre="Curacaví", CodComuna="13503", CodProvincia="135"},
                        new ComunaEntity {Nombre="María Pinto", CodComuna="13504", CodProvincia="135"},
                        new ComunaEntity {Nombre="San Pedro", CodComuna="13505", CodProvincia="135"},
                        new ComunaEntity {Nombre="Talagante", CodComuna="13601", CodProvincia="136"},
                        new ComunaEntity {Nombre="El Monte",CodComuna= "13602", CodProvincia="136"},
                        new ComunaEntity {Nombre="Isla de Maipo", CodComuna="13603", CodProvincia="136"},
                        new ComunaEntity {Nombre="Padre Hurtado", CodComuna="13604", CodProvincia="136"},
                        new ComunaEntity {Nombre="Peñaflor", CodComuna="13605", CodProvincia="136"},
                        new ComunaEntity {Nombre="San Fernando", CodComuna="06301", CodProvincia="063"},
                        new ComunaEntity {Nombre="Chépica", CodComuna="06302", CodProvincia="063"},
                        new ComunaEntity {Nombre="Chimbarongo", CodComuna="06303", CodProvincia="063"},
                        new ComunaEntity {Nombre="Lolol", CodComuna="06304", CodProvincia="063"},
                        new ComunaEntity {Nombre="Nancagua", CodComuna="06305", CodProvincia="063"},
                        new ComunaEntity {Nombre="Palmilla", CodComuna="06306", CodProvincia="063"},
                        new ComunaEntity {Nombre="Peralillo", CodComuna="06307", CodProvincia="063"},
                        new ComunaEntity {Nombre="Placilla", CodComuna="06308", CodProvincia="063"},
                        new ComunaEntity {Nombre="Pumanque", CodComuna="06309", CodProvincia="063"},
                        new ComunaEntity {Nombre="Talca", CodComuna="07101", CodProvincia="071"},
                        new ComunaEntity {Nombre="Constitución", CodComuna="07102", CodProvincia="071"},
                        new ComunaEntity {Nombre="Curepto", CodComuna="07103", CodProvincia="071"},
                        new ComunaEntity {Nombre="Empedrado", CodComuna="07104", CodProvincia="071"},
                        new ComunaEntity {Nombre="Maule", CodComuna="07105", CodProvincia="071"},
                        new ComunaEntity {Nombre="Pozo Almonte", CodComuna="01401", CodProvincia="014"},
                        new ComunaEntity {Nombre="Colchane", CodComuna="01403", CodProvincia="014"},
                        new ComunaEntity {Nombre="Camiña", CodComuna="01402", CodProvincia="014"},
                        new ComunaEntity {Nombre="Huara", CodComuna="01404", CodProvincia="014"},
                        new ComunaEntity {Nombre="Pica", CodComuna="01405", CodProvincia="014"},
                        new ComunaEntity {Nombre="Valdivia", CodComuna="14101", CodProvincia="141"},
                        new ComunaEntity {Nombre="Corral", CodComuna="14102", CodProvincia="141"},
                        new ComunaEntity {Nombre="Los Lagos", CodComuna="14104", CodProvincia="141"},
                        new ComunaEntity {Nombre="Lanco", CodComuna="14103", CodProvincia="141"},
                        new ComunaEntity {Nombre="Máfil", CodComuna="14105", CodProvincia="141"},
                        new ComunaEntity {Nombre="Mariquina", CodComuna="14106", CodProvincia="141"},
                        new ComunaEntity {Nombre="Paillaco", CodComuna="14107", CodProvincia="141"},
                        new ComunaEntity {Nombre="Panguipulli", CodComuna="14108", CodProvincia="141"},
                        new ComunaEntity {Nombre="La Unión", CodComuna="14201", CodProvincia="142"},
                        new ComunaEntity {Nombre="Futrono", CodComuna="14202", CodProvincia="142"},
                        new ComunaEntity {Nombre="Lago Ranco", CodComuna="14203", CodProvincia="142"},
                        new ComunaEntity {Nombre="Río Bueno", CodComuna="14204", CodProvincia="142"},
                        new ComunaEntity {Nombre="Arica", CodComuna="15101", CodProvincia="151"},
                        new ComunaEntity {Nombre="Camarones", CodComuna="15102", CodProvincia="151"},
                        new ComunaEntity {Nombre="Putre", CodComuna="15201", CodProvincia="152"},
                        new ComunaEntity {Nombre="General Lagos", CodComuna="15202", CodProvincia="152"},
                        new ComunaEntity {Nombre="Pelarco", CodComuna="07106", CodProvincia="071"},
                        new ComunaEntity {Nombre="Pencahue", CodComuna="07107", CodProvincia="071"},
                        new ComunaEntity {Nombre="Río Claro", CodComuna="07108", CodProvincia="071"},
                        new ComunaEntity {Nombre="San Clemente", CodComuna="07109", CodProvincia="071"},
                        new ComunaEntity {Nombre="San Rafael", CodComuna="07110", CodProvincia="071"},
                        new ComunaEntity {Nombre="Cauquenes", CodComuna="07201", CodProvincia="072"},
                        new ComunaEntity {Nombre="Chanco", CodComuna="07202", CodProvincia="072"},
                        new ComunaEntity {Nombre="Pelluhue", CodComuna="07203", CodProvincia="072"},
                        new ComunaEntity {Nombre="Curicó", CodComuna="07301", CodProvincia="073"},
                        new ComunaEntity {Nombre="Hualañé", CodComuna="07302", CodProvincia="073"},
                        new ComunaEntity {Nombre="Licantén", CodComuna="07303", CodProvincia="073"},
                        new ComunaEntity {Nombre="Molina", CodComuna="07304", CodProvincia="073"},
                        new ComunaEntity {Nombre="Rauco", CodComuna="07305", CodProvincia="073"},
                        new ComunaEntity {Nombre="Romeral", CodComuna="07306", CodProvincia="073"},
                        new ComunaEntity {Nombre="Sagrada Familia", CodComuna="07307", CodProvincia="073"},
                        new ComunaEntity {Nombre="Teno", CodComuna="07308", CodProvincia="073"},
                        new ComunaEntity {Nombre="Vichuquén", CodComuna="07309", CodProvincia="073"},
                        new ComunaEntity {Nombre="Linares", CodComuna="07401", CodProvincia="074"},
                        new ComunaEntity {Nombre="Colbún", CodComuna="07402", CodProvincia="074"},
                        new ComunaEntity {Nombre="Longaví", CodComuna="07403", CodProvincia="074"},
                        new ComunaEntity {Nombre="Parral", CodComuna="07404", CodProvincia="074"},
                        new ComunaEntity {Nombre="Retiro", CodComuna="07405", CodProvincia="074"},
                        new ComunaEntity {Nombre="San Javier", CodComuna="07406", CodProvincia="074"},
                        new ComunaEntity {Nombre="Concepción", CodComuna="08101", CodProvincia="081"},
                        new ComunaEntity {Nombre="Coronel", CodComuna="08102", CodProvincia="081"},
                        new ComunaEntity {Nombre="Chiguayante", CodComuna="08103", CodProvincia="081"},
                        new ComunaEntity {Nombre="Florida", CodComuna="08104", CodProvincia="081"},
                        new ComunaEntity {Nombre="Hualqui", CodComuna="08105", CodProvincia="081"},
                        new ComunaEntity {Nombre="Lota", CodComuna="08106", CodProvincia="081"},
                        new ComunaEntity {Nombre="Penco", CodComuna="08107", CodProvincia="081"},
                        new ComunaEntity {Nombre="San Pedro de la Paz", CodComuna="08108", CodProvincia="081"},
                        new ComunaEntity {Nombre="Santa Juana", CodComuna="08109", CodProvincia="081"},
                        new ComunaEntity {Nombre="Talcahuano", CodComuna="08110", CodProvincia="081"},
                        new ComunaEntity {Nombre="Tomé", CodComuna="08111", CodProvincia="081"},
                        new ComunaEntity {Nombre="Lebu", CodComuna="08201", CodProvincia="082"},
                        new ComunaEntity {Nombre="Arauco", CodComuna="08202", CodProvincia="082"},
                        new ComunaEntity {Nombre="Cañete", CodComuna="08203", CodProvincia="082"},
                        new ComunaEntity {Nombre="Contulmo", CodComuna="08204", CodProvincia="082"},
                        new ComunaEntity {Nombre="Curanilahue", CodComuna="08205", CodProvincia="082"},
                        new ComunaEntity {Nombre="Los Álamos", CodComuna="08206", CodProvincia="082"},
                        new ComunaEntity {Nombre="Tirúa", CodComuna="08207", CodProvincia="082"},
                        new ComunaEntity {Nombre="Carahue", CodComuna="09102", CodProvincia="091"},
                        new ComunaEntity {Nombre="Cunco", CodComuna="09103", CodProvincia="091"},
                        new ComunaEntity {Nombre="Curarrehue", CodComuna="09104", CodProvincia="091"},
                        new ComunaEntity {Nombre="Freire", CodComuna="09105", CodProvincia="091"},
                        new ComunaEntity {Nombre="Galvarino", CodComuna="09106", CodProvincia="091"},
                        new ComunaEntity {Nombre="Gorbea", CodComuna="09107", CodProvincia="091"},
                        new ComunaEntity {Nombre="Lautaro", CodComuna="09108", CodProvincia="091"},
                        new ComunaEntity {Nombre="Loncoche", CodComuna="09109", CodProvincia="091"},
                        new ComunaEntity {Nombre="Melipeuco", CodComuna="09110", CodProvincia="091"},
                        new ComunaEntity {Nombre="Nueva Imperial", CodComuna="09111", CodProvincia="091"},
                        new ComunaEntity {Nombre="Padre las Casas", CodComuna="09112", CodProvincia="091"},
                        new ComunaEntity {Nombre="Perquenco", CodComuna="09113", CodProvincia="091"},
                        new ComunaEntity {Nombre="Pitrufquén", CodComuna="09114", CodProvincia="091"},
                        new ComunaEntity {Nombre="Pucón", CodComuna="09115", CodProvincia="091"},
                        new ComunaEntity {Nombre="Saavedra", CodComuna="09116", CodProvincia="091"},
                        new ComunaEntity {Nombre="Tocopilla", CodComuna="02301", CodProvincia="023"},
                        new ComunaEntity {Nombre="María Elena", CodComuna="02302", CodProvincia="023"},
                        new ComunaEntity {Nombre="Freirina", CodComuna="03303", CodProvincia="033"},
                        new ComunaEntity {Nombre="Canela", CodComuna="04202", CodProvincia="042"},
                        new ComunaEntity {Nombre="Los Vilos", CodComuna="04203", CodProvincia="042"},
                        new ComunaEntity {Nombre="Salamanca", CodComuna="04204", CodProvincia="042"},
                        new ComunaEntity {Nombre="Ovalle", CodComuna="04301", CodProvincia="043"},
                        new ComunaEntity {Nombre="Combarbalá", CodComuna="04302", CodProvincia="043"},
                        new ComunaEntity {Nombre="Monte Patria", CodComuna="04303", CodProvincia="043"},
                        new ComunaEntity {Nombre="Punitaqui", CodComuna="04304", CodProvincia="043"},
                        new ComunaEntity {Nombre="Río Hurtado", CodComuna="04305", CodProvincia="043"},
                        new ComunaEntity {Nombre="La Ligua", CodComuna="05401", CodProvincia="054"},
                        new ComunaEntity {Nombre="Cabildo", CodComuna="05402", CodProvincia="054"},
                        new ComunaEntity {Nombre="Papudo", CodComuna="05403", CodProvincia="054"},
                        new ComunaEntity {Nombre="Petorca", CodComuna="05404", CodProvincia="054"},
                        new ComunaEntity {Nombre="Zapallar", CodComuna="05405", CodProvincia="054"},
                        new ComunaEntity {Nombre="Quillota", CodComuna="05501", CodProvincia="055"},
                        new ComunaEntity {Nombre="Calera", CodComuna="05502", CodProvincia="055"},
                        new ComunaEntity {Nombre="Hijuelas", CodComuna="05503", CodProvincia="055"},
                        new ComunaEntity {Nombre="La Cruz", CodComuna="05504", CodProvincia="055"},
                        new ComunaEntity {Nombre="Nogales", CodComuna="05506", CodProvincia="055"},
                        new ComunaEntity {Nombre="San Antonio", CodComuna="05601", CodProvincia="056"},
                        new ComunaEntity {Nombre="Algarrobo", CodComuna="05602", CodProvincia="056"},
                        new ComunaEntity {Nombre="Cartagena", CodComuna="05603", CodProvincia="056"},
                        new ComunaEntity {Nombre="El Quisco", CodComuna="05604", CodProvincia="056"},
                        new ComunaEntity {Nombre="El Tabo", CodComuna="05605", CodProvincia="056"},
                        new ComunaEntity {Nombre="Santo Domingo", CodComuna="05606", CodProvincia="056"},
                        new ComunaEntity {Nombre="San Felipe", CodComuna="05701", CodProvincia="057"},
                        new ComunaEntity {Nombre="Catemu", CodComuna="05702", CodProvincia="057"},
                        new ComunaEntity {Nombre="Llaillay", CodComuna="05703", CodProvincia="057"},
                        new ComunaEntity {Nombre="Panquehue", CodComuna="05704", CodProvincia="057"},
                        new ComunaEntity {Nombre="Putaendo", CodComuna="05705", CodProvincia="057"},
                        new ComunaEntity {Nombre="Santa María", CodComuna="05706", CodProvincia="057"},
                        new ComunaEntity {Nombre="Santa Cruz", CodComuna="06310", CodProvincia="063"},
                        new ComunaEntity {Nombre="Villa Alegre", CodComuna="07407", CodProvincia="074"},
                        new ComunaEntity {Nombre="Yerbas Buenas", CodComuna="07408", CodProvincia="074"},
                        new ComunaEntity {Nombre="Los Ángeles", CodComuna="08301", CodProvincia="083"},
                        new ComunaEntity {Nombre="Antuco", CodComuna="08302", CodProvincia="083"},
                        new ComunaEntity {Nombre="Cabrero", CodComuna="08303", CodProvincia="083"},
                        new ComunaEntity {Nombre="Laja", CodComuna="08304", CodProvincia="083"},
                        new ComunaEntity {Nombre="Mulchén", CodComuna="08305", CodProvincia="083"},
                        new ComunaEntity {Nombre="Nacimiento", CodComuna="08306", CodProvincia="083"},
                        new ComunaEntity {Nombre="Negrete", CodComuna="08307", CodProvincia="083"},
                        new ComunaEntity {Nombre="Quilaco", CodComuna="08308", CodProvincia="083"},
                        new ComunaEntity {Nombre="Quilleco", CodComuna="08309", CodProvincia="083"},
                        new ComunaEntity {Nombre="San Rosendo", CodComuna="08310", CodProvincia="083"},
                        new ComunaEntity {Nombre="Santa Bárbara", CodComuna="08311", CodProvincia="083"},
                        new ComunaEntity {Nombre="Tucapel",CodComuna= "08312", CodProvincia="083"},
                        new ComunaEntity {Nombre="Yumbel", CodComuna="08313", CodProvincia="083"},
                        new ComunaEntity {Nombre="Chillán", CodComuna="08401", CodProvincia="084"},
                        new ComunaEntity {Nombre="Cobquecura", CodComuna="08403", CodProvincia="084"},
                        new ComunaEntity {Nombre="Coelemu", CodComuna="08404", CodProvincia="084"},
                        new ComunaEntity {Nombre="Coihueco", CodComuna="08405", CodProvincia="084"},
                        new ComunaEntity {Nombre="Chillán Viejo", CodComuna="08406", CodProvincia="084"},
                        new ComunaEntity {Nombre="El Carmen", CodComuna="08407", CodProvincia="084"},
                        new ComunaEntity {Nombre="Ninhue", CodComuna="08408", CodProvincia="084"},
                        new ComunaEntity {Nombre="Ñiquén", CodComuna="08409", CodProvincia="084"},
                        new ComunaEntity {Nombre="Pemuco", CodComuna="08410", CodProvincia="084"},
                        new ComunaEntity {Nombre="Pinto", CodComuna="08411", CodProvincia="084"},
                        new ComunaEntity {Nombre="Portezuelo", CodComuna="08412", CodProvincia="084"},
                        new ComunaEntity {Nombre="Quillón", CodComuna="08413", CodProvincia="084"},
                        new ComunaEntity {Nombre="Quirihue", CodComuna="08414", CodProvincia="084"},
                        new ComunaEntity {Nombre="Ránquil", CodComuna="08415", CodProvincia="084"},
                        new ComunaEntity {Nombre="San Carlos", CodComuna="08416", CodProvincia="084"},
                        new ComunaEntity {Nombre="San Fabián", CodComuna="08417", CodProvincia="084"},
                        new ComunaEntity {Nombre="San Ignacio", CodComuna="08418", CodProvincia="084"},
                        new ComunaEntity {Nombre="San Nicolás", CodComuna="08419", CodProvincia="084"},
                        new ComunaEntity {Nombre="Treguaco", CodComuna="08420", CodProvincia="084"},
                        new ComunaEntity {Nombre="Yungay", CodComuna="08421", CodProvincia="084"},
                        new ComunaEntity {Nombre="Teodoro Schmidt", CodComuna="09117", CodProvincia="091"},
                        new ComunaEntity {Nombre="Toltén", CodComuna="09118", CodProvincia="091"},
                        new ComunaEntity {Nombre="Vilcún", CodComuna="09119", CodProvincia="091"},
                        new ComunaEntity {Nombre="Villarrica", CodComuna="09120", CodProvincia="091"},
                        new ComunaEntity {Nombre="Angol", CodComuna="09201", CodProvincia="092"},
                        new ComunaEntity {Nombre="Collipulli", CodComuna="09202", CodProvincia="092"},
                        new ComunaEntity {Nombre="Curacautín", CodComuna="09203", CodProvincia="092"},
                        new ComunaEntity {Nombre="Ercilla", CodComuna="09204", CodProvincia="092"},
                        new ComunaEntity {Nombre="Lonquimay", CodComuna="09205", CodProvincia="092"},
                        new ComunaEntity {Nombre="Los Sauces", CodComuna="09206", CodProvincia="092"},
                        new ComunaEntity {Nombre="Lumaco", CodComuna="09207", CodProvincia="092"},
                        new ComunaEntity {Nombre="Purén", CodComuna="09208", CodProvincia="092"},
                        new ComunaEntity {Nombre="Renaico", CodComuna="09209", CodProvincia="092"},
                        new ComunaEntity {Nombre="Traiguén", CodComuna="09210", CodProvincia="092"},
                        new ComunaEntity {Nombre="Victoria", CodComuna="09211", CodProvincia="092"},
                        new ComunaEntity {Nombre="San Juan de la Costa", CodComuna="10306", CodProvincia="103"},
                        new ComunaEntity {Nombre="San Pablo", CodComuna="10307", CodProvincia="103"},
                        new ComunaEntity {Nombre="Palena", CodComuna="10404", CodProvincia="104"},
                        new ComunaEntity {Nombre="Coihaique", CodComuna="11101", CodProvincia="111"},
                        new ComunaEntity {Nombre="Lago Verde", CodComuna="11102", CodProvincia="111"},
                        new ComunaEntity {Nombre="Aisén", CodComuna="11201", CodProvincia="112"},
                        new ComunaEntity {Nombre="Cisnes", CodComuna="11202", CodProvincia="112"},
                        new ComunaEntity {Nombre="Guaitecas", CodComuna="11203", CodProvincia="112"},
                        new ComunaEntity {Nombre="Cochrane", CodComuna="11301", CodProvincia="113"},
                        new ComunaEntity {Nombre="O’Higgins", CodComuna="11302", CodProvincia="113"},
                        new ComunaEntity {Nombre="Limache", CodComuna="05802", CodProvincia="058"},
                        new ComunaEntity {Nombre="Villa Alemana", CodComuna="05804", CodProvincia="058"},
                        new ComunaEntity {Nombre="Hualpén", CodComuna="08112", CodProvincia="081"},
                        new ComunaEntity {Nombre="Alto Biobío", CodComuna="08314", CodProvincia="083"},
                        new ComunaEntity {Nombre="Cholchol", CodComuna="09121", CodProvincia="091"},
                        new ComunaEntity {Nombre="Tortel", CodComuna="11303", CodProvincia="113"},
                        new ComunaEntity {Nombre="Chile Chico", CodComuna="11401", CodProvincia="114"},
                        new ComunaEntity {Nombre="Río Ibáñez", CodComuna="11402", CodProvincia="114"},
                        new ComunaEntity {Nombre="Punta Arenas", CodComuna="12101", CodProvincia="121"},
                        new ComunaEntity {Nombre="Laguna Blanca", CodComuna="12102", CodProvincia="121"},
                        new ComunaEntity {Nombre="Río Verde", CodComuna="12103", CodProvincia="121"},
                        new ComunaEntity {Nombre="San Gregorio", CodComuna="12104", CodProvincia="121"},
                        new ComunaEntity {Nombre="Cabo de Hornos (Ex Navarino)", CodComuna="12201", CodProvincia="122"},
                        new ComunaEntity {Nombre="Antártica", CodComuna="12202", CodProvincia="122"},
                        new ComunaEntity {Nombre="Porvenir", CodComuna="12301", CodProvincia="123"},
                        new ComunaEntity {Nombre="Primavera", CodComuna="12302", CodProvincia="123"},
                        new ComunaEntity {Nombre="Timaukel", CodComuna="12303", CodProvincia="123"},
                        new ComunaEntity {Nombre="Natales", CodComuna="12401", CodProvincia="124"},
                        new ComunaEntity {Nombre="Torres del Paine", CodComuna="12402", CodProvincia="124"},
                        new ComunaEntity {Nombre="Santiago", CodComuna="13101", CodProvincia="131"},
                        new ComunaEntity {Nombre="Cerrillos", CodComuna="13102", CodProvincia="131"},
                        new ComunaEntity {Nombre="Cerro Navia", CodComuna="13103", CodProvincia="131"},
                        new ComunaEntity {Nombre="Conchalí", CodComuna="13104", CodProvincia="131"},
                        new ComunaEntity {Nombre="El Bosque", CodComuna="13105", CodProvincia="131"},
                        new ComunaEntity {Nombre="Estación Central", CodComuna="13106", CodProvincia="131"},
                        new ComunaEntity {Nombre="Huechuraba", CodComuna="13107", CodProvincia="131"},
                        new ComunaEntity {Nombre="Independencia", CodComuna="13108", CodProvincia="131"},
                        new ComunaEntity {Nombre="La Cisterna", CodComuna="13109", CodProvincia="131"},
                        new ComunaEntity {Nombre="La Florida", CodComuna="13110", CodProvincia="131"},
                        new ComunaEntity {Nombre="La Granja", CodComuna="13111", CodProvincia="131"},
                        new ComunaEntity {Nombre="La Pintana", CodComuna="13112", CodProvincia="131"},
                        new ComunaEntity {Nombre="La Reina", CodComuna="13113", CodProvincia="131"},
                        new ComunaEntity {Nombre="Las Condes", CodComuna="13114", CodProvincia="131"},
                        new ComunaEntity {Nombre="Lo Barnechea", CodComuna="13115", CodProvincia="131"},
                        new ComunaEntity {Nombre="Lo Espejo", CodComuna="13116", CodProvincia="131"},
                        new ComunaEntity {Nombre="Lo Prado", CodComuna="13117", CodProvincia="131"},
                        new ComunaEntity {Nombre="Macul", CodComuna="13118", CodProvincia="131"},
                        new ComunaEntity {Nombre="Maipú", CodComuna="13119", CodProvincia="131"},
                        new ComunaEntity {Nombre="Ñuñoa", CodComuna="13120", CodProvincia="131"},
                        new ComunaEntity {Nombre="Alto Hospicio", CodComuna="01107", CodProvincia="011"},
                        new ComunaEntity {Nombre="Quilpué", CodComuna="05801", CodProvincia="058"},
                        new ComunaEntity {Nombre="Olmué", CodComuna="05803", CodProvincia="058"},

                    };

                    context.AddRange(zonas);
                    await context.SaveChangesAsync();
                    dbContextTransaction.Commit();
                }
            }

            if (!context.Version.Any())
            {
                using (var dbContextTransaction = context.Database.BeginTransaction())
                {
                    VersionEntity version = new VersionEntity { version = "0.0.1", Descripcion = "prototipo inicial", FechaCreacion = DateTime.UtcNow, Estado = true };

                    context.Add(version);
                    await context.SaveChangesAsync();
                    dbContextTransaction.Commit();
                }
            }

            if (!context.RoleClaims.Any())
            {
                using (var dbContextTransaction = context.Database.BeginTransaction())
                {
                    List<EnumModel> configuracion = ((permisos_configuracion[])Enum.GetValues(typeof(permisos_configuracion))).Select(c => new EnumModel() { Value = (int)c, Name = c.ToString() }).ToList();

                    var listaClaims = new List<RoleClaimsEntity>();

                    var AllRoles = await (from cust in context.Roles select cust).ToListAsync();

                    var allClaims = await (from cl in context.RoleClaims select cl).ToListAsync();

                    foreach (var item in AllRoles)
                    {
                        for (int j = 0; j < configuracion.Count(); j++)
                        {
                            var resultado = allClaims.Any(a => a.ClaimType == "Permission" && a.ClaimValue == configuracion[j].Name.ToString());

                            if (!resultado)
                            {
                                var clain = new RoleClaimsEntity
                                {
                                    RoleId = item.Id,
                                    ClaimType = "Permission",
                                    ClaimValue = configuracion[j].Name.ToString(),
                                    PermisoId = configuracion[j].Value,
                                };

                                listaClaims.Add(clain);
                            }
                        }
                    }

                    await context.AddRangeAsync(listaClaims);
                    await context.SaveChangesAsync();
                    dbContextTransaction.Commit();
                }
            }

            if (!context.Empresa.Any())
            {
                using (var dbContextTransaction = context.Database.BeginTransaction())
                {
                    EmpresaEntity empresa = new EmpresaEntity
                    {
                        rut = "1111111-1",
                        razonSocial = "Deuz TI",
                        direccion = "Avenida siempre viva 1234",
                        telefono = "+569 1111111",
                        email = "contacto@deuzti.cl",
                        activo = true,
                        fk_comuna = "06201",
                        imagen = string.Empty
                    };

                    context.Add(empresa);
                    await context.SaveChangesAsync();
                    dbContextTransaction.Commit();
                }
            }
        }
    }
}
