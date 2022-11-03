import { environmentPermisos } from "../app/core/helpers/utility/variable.permisos";

export const environment = {
  production: false,
  apiUrl: 'http://192.168.0.8:5001/api/',
  apiAuth: 'https://api-local.hsalvador.cl/ApiAuth/api/Auth',
  apiGestorDocumental: 'https://localhost:44378/api/',
  apiGestorDocumentalArchivos: 'https://serviciosweb.hsalvador.cl:8443/GestorDocumentalApir/api', 
  idSistema: 33,
  tiempoInactivo: 600, // 10 min
  tiempoEsperaRespuesta: 240000, //4 min
  permisos: environmentPermisos
};

