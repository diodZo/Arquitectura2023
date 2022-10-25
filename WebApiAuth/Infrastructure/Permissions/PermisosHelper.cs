namespace WebApiAuth.Infrastructure.Permissions
{
    public class EnumModel
    {
        public int Value { get; set; }
        public string Name { get; set; }
    }

    public enum permisos_configuracion
    {
        conf_ver_inicio = 1,
        conf_ver_perfil = 2,
        conf_cambiar_pass = 3,
    }
}
