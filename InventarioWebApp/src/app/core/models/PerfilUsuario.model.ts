
export interface UsuarioPerfil {
    usuario?:   Usuario;
    servicios?: Servicio[];
}

export interface Servicio {
    codigo:       number;
    nombre:       string;
    codservicio:  number;
    codusuario:   string;
    denominacion: string;
}

export interface Usuario {
    codigo:      number;
    rut:         string;
    codusuario:  string;
    apellpat:    string;
    apellmat:    string;
    nombres:     string;
    nombre2:     string;
    razsocial:   string;
    direccion:   string;
    fono:        string;
    fx:          string;
    categoria:   string;
    comuna:      string;
    funcionario: string;
    atencion:    string;
    diagnostico: string;
    datares:     string;
    estsalud:    string;
}
