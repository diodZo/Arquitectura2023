import { Servicio } from "./Servicio";

export interface Documento {
    id: number;
    nombre: string;
    servicioTarget: Servicio[] ;
}
