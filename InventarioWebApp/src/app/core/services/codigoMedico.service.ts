import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Sabst030Usuario } from '../models/CodigoMedico/Sabst030Usuario';
import { SelectModelV2 } from '../models/CodigoMedico/selectModel';
import { Servicio } from '../models/Servicio';

const base_url = `${environment.apiGestorDocumental}CodigoMedico`;

@Injectable({
  providedIn: 'root'
})
export class CodigoMedicoService {

constructor(
  private http: HttpClient 
) { 
}

GetUsuario(form: any): Observable<any> {
  return this.http.get<Sabst030Usuario>(`${base_url}/getBuscarPorRut/${form.rut}`)
  .pipe(map(res => {
      return res;
    }),
    catchError(e => {
      return throwError(e);
    })
  );
}

cargarServicios(): any {
  const url = `${ base_url }/getListaServicios`;
  return this.http.get<Servicio>( url)
              .pipe(map(res => {
                  return res;
                }),
                catchError(e => {
                  return throwError(e);
                }));
}

cargarSistemaCotratacion(): any {
  const url = `${ base_url }/getSistemaContratacion`;
  return this.http.get<SelectModelV2>( url)
              .pipe(map(res => {
                  return res;
                }),
                catchError(e => {
                  return throwError(e);
                }));
}

subirSolicitud(formData: any) {

  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Accept', 'application/json');
  let options = { headers: headers, reportProgress: true };

  formData.rut       = formData.rutOculto;
  formData.dv        = formData.dvOculto;  

  const url = `${ base_url }/SaveSolicitudConDocumentos`;

  console.log("options", options)
  console.log("subirSolicitud", formData)

  return this.http.post(url, formData, options)
    .pipe(
      map((response: any) => response as boolean),
      catchError((error) => {
        console.error(error.error.mensaje);
        return throwError(() => error);
      }));
}

getSolicitudesPendientes(): Observable<any> {
  const url = `${ base_url }/getSolicitudesPendientes`;

  return this.http.get<any>(`${url}`, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(
    catchError(e => {        
      if (e.status == 404) {
        return [];
      } else {
        return throwError(() => e);
      }

    })
  );
}

DerivarSolicitud(model: any, usermod: any): Observable<any> {
  model.usrmod = usermod;
  return this.http.post<any>(`${base_url}/DerivarSolicitud/`, model, {observe: 'response'})
  .pipe(
    catchError(e => {
      if (e.status == 400) {
        return throwError(() => e);
      }
      return throwError(() => e);
    }));
}

AprobarSolicitud(model: any, usermod: any): Observable<any> {
  model.usrmod = usermod;
  return this.http.post<any>(`${base_url}/aprobarSolicitud/`, model, {observe: 'response'})
  .pipe(
    catchError(e => {
      if (e.status == 400) {
        return throwError(() => e);
      }
      return throwError(() => e);
    }));
}

editarDeribados(formData: any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  let options = { headers: headers, reportProgress: true };
  formData.rut       = formData.rutOculto;
  formData.dv        = formData.dvOculto;  
  const url          = `${ base_url }/editarDeribados`;

  console.log("formData v2", formData);
  console.log("url", url);

  return this.http.post(url, formData, options)
    .pipe(
      map((response: any) => response as boolean),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(() => e);
      }));
}


anularSolicitud(model: any, usermod: any): Observable<any> {

  model.usrmod = usermod;

  return this.http.post<any>(`${base_url}/anularSolicitud/`, model, {observe: 'response'})
  .pipe(
    catchError(e => {
      if (e.status == 400) {
        return throwError(() => e);
      }
      return throwError(() => e);
    }));
}

getHistorialByCodReg(form: any): Observable<any> {
  const url = `${ base_url }/getHistorialByCodReg/${form.codregini}`;

  return this.http.get<any>(`${url}`, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(
    catchError(e => {        
      if (e.status == 404) {
        return [];
      } else {
        return throwError(() => e);
      }

    })
  );
}

getSolicitudesByUsuario(usuario: any): Observable<any> {
  const url = `${ base_url }/getSolicitudesByUsuario/${usuario.rut}`;

  return this.http.get<any>(`${url}`, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(
    catchError(e => {        
      if (e.status == 404) {
        // this.router.navigate(['/rrhh/desempeno/funcionarios']);
         //Swal.fire('Informacion importante', 'No hay periodo evaluación en estos momentos!', 'info');
        return [];
      } else {
        return throwError(e);
      }

    })
  );
}

getEmailByRut(usuario: any): Observable<any> {
  const url = `${ base_url }/getEmailByRut/${usuario.rut}`;

  return this.http.get<any>(`${url}`, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(
    catchError(e => {        
      if (e.status == 404) {
        return [];
      } else {
        return throwError(e);
      }
    })
  );
}

}
