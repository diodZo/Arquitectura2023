import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioPerfil } from '../models/PerfilUsuario.model';
import { AuthService } from './auth.service';

const base_url = environment.apiAuth;

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  constructor(
    private http: HttpClient, 
    private auth: AuthService   
) { }

  ChangePass(model: any): Observable<any> {

    let data = {
      userName   : this.auth.userName,
      sistema    : environment.idSistema,
      oldpassword: model.oldpassword,
      newpassword: model.newpassword
    };

    return this.http.post<any>(`${base_url}/ChangePass/`, data, {observe: 'response'})
    .pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        return throwError(e);
      }));
  }

  PerfilUsuario(): Observable<any> {
    return this.http.get<UsuarioPerfil>(`${base_url}/DatosUsuario/${this.auth.userName}`)
    .pipe(map(res => {
        return res;
      }),
      catchError(e => {
        return throwError(e);
      })
    );
  }


  saveEmailChange(rq: any): Observable<any> {
    return this.http.post(`${base_url}/ChangeEmail`, rq)
      .pipe(
        map((response: any) => response as boolean),
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        }));
  }
}
