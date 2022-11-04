export interface Funcionario {
    codigo:             number;
    rut:                number;
    dv:                 string;
    funcionario:        string;
    rutjefe:            number;
    dvjefe:             string;
    jefe:               string;
    estamento:          number;
    estamentonombre:    null;
    calidad:            number;
    calidadnombre:      null;
    grado:              number;
    gradronombre:       null;
    horas:              number;
    horasnombre:        null;
    codservsirh:        number;
    codservsirhnombre:  null;
    unidad:             number;
    unidadnombre:       string;
    subdireccion:       number;
    subdireccionnombre: null;
    inicio:             Date;
    fin:                Date;
    estado:             number;
    r1:                 null;
    r2:                 null;
    r3:                 null;
    estadoinforme : boolean;
    evaluacioncodigo:number;
    periodo:string;
    fecfun?:Date;
    conforme:number;
    apelar:number;
    idperiodo:number;
    existe : number;
    obs:string;
    respuesta:number;

}