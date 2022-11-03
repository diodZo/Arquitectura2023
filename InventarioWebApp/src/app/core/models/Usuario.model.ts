import { INavData } from "../helpers/model/sidebar-nav";


export interface Usuario {
    
    token:   string;
    usuario: UsuarioClass;
    roles: string[];
    navItems: INavData[];    
}

export interface UsuarioClass {
    codigo:     number;
    rut:        number;
    codusuario: string;
    digitover:  string;
    apellpat:   string;
    apellmat:   string;
    nombres:    string;
    nombre2:    string;
    cambiopass: number;
}
