import { Historial } from "./historial";
import { Servicio } from "./PerfilUsuario.model";
import { Providencias } from "./providencias";

export interface BandejaEntrada {

    servicio:Servicio;
    porRevisar : number;
    EntradasBandeja:Entrada[];

}
export interface Entrada {
    solicitante: number;
    tipo: number;  
    estado: number;
    servder: number; 
    numero: number;
    codigo: number;  
    servsol: any;
    asunto: string;
    usring: number;  
    obs: string;
    fecing:any; 
    link:string;
    _hocing:any;
    horaingstr:string;
    fecingstr:string;
    visto:number;
    asuntotipo:any;

    providencias:Providencias[];
    historiales : Historial[];

    estadodoc:any;
    colorAsunto:string;

    codigobandejaservicio :number;
    canprovidencias:number;
    codregprov:number;
    motivo:string;
    gestion:string;

    reserva:boolean;
    verReserva:boolean;
    coddocsol:number

    OcultarBandeja:boolean;
}