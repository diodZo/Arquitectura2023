import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { INavData } from '../helpers/model/sidebar-nav';
import { Usuario } from '../models/PerfilUsuario.model';
import { Roles } from '../models/Roles';
import { UsuarioClass } from '../models/Usuario.model';

const base_url = environment.apiAuth;
const jwtHelper =  new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl           =  environment.apiAuth;  
  decodedToken      :  any;
  public auth2      :  any;
  private _usuario! :  Usuario;
  private _token!   :  string;
  private _roles    :  string[] = [];
  private _navItems :  INavData[] = [];
  private _rol      :  Roles[] = [];

  constructor(
    private http: HttpClient,
    private ngZone: NgZone,
    private router: Router
  ) { }

  public get usuario(): Usuario | null {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}') as Usuario;
      return this._usuario;
    }
    return null;
  }

  public get Roles(): Roles[] | null {
    this._rol = JSON.parse(sessionStorage.getItem('roles')!);
    return this._rol;
  }

  public get NombreUsuario(): string | null {
    const { nombres, apellpat, apellmat } = JSON.parse(sessionStorage.getItem('usuario') || '{}') as UsuarioClass;
    return `${nombres} ${apellpat} ${apellmat}`;
  }

  public get token(): string | null {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token') || '{}';
      return this._token;
    }
    return null;
  }

  public get menu(): INavData[] {
    if (Array.isArray(this._navItems) && this._navItems.length) {
      return this._navItems;
    } else {    
      this._navItems = JSON.parse(sessionStorage.getItem('menu') || '{}') as INavData[];
      return this._navItems;
    }
  }

  public get userName(): number | null {
    const { rut } = JSON.parse(sessionStorage.getItem('usuario') || '{}') as UsuarioClass;
    return rut;
  }

  public cambioPass():number{
    let usuario : any = JSON.parse(sessionStorage.getItem('usuario') || '{}') as Usuario; 
    return usuario.cambiopass;
  }

  public tienePermiso(permiso: number): boolean {  
    this._rol = JSON.parse(sessionStorage.getItem('roles')!);
    if(this._rol.length > 0){
        return this._rol[0].permisosRol.includes(permiso);
    }
    return false;
  }

  public tieneRol(rol: number): boolean {  
    if(this._rol.length > 0){
        this._rol = JSON.parse(sessionStorage.getItem('roles')!);
        return this._rol[0].codigorol == rol;
    }
    return false;
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  login(model: any) {
    model.sistema = environment.idSistema;
    return this.http.post(`${base_url}/Login`, model)
      .pipe(
        map((response: any) => {
          const user = response;        

          console.info("login", user);
          if (user) {          
            sessionStorage.setItem('token', user.token);
            sessionStorage.setItem('usuario', JSON.stringify(user.usuario));
            sessionStorage.setItem('menu', JSON.stringify(user.navdata));
            sessionStorage.setItem('roles', JSON.stringify(user.rolesUser));        
            this.decodedToken = jwtHelper.decodeToken(user.token);
            this._navItems = user.navdata;
            this._roles = this.decodedToken.role;
            
          }
        })
      );
  }

  refreshToken(): void {
    let data = {
      userName: this.userName,
      sistema: environment.idSistema,
    };
    this.http.post<any>(`${base_url}/RefreshToken/`, data).subscribe({
      next: (response: any) => {
        const user: any = response;
        if (user) {
          sessionStorage.setItem('token', user.token);
          sessionStorage.setItem('usuario', JSON.stringify(user.usuario));
          this.decodedToken = jwtHelper.decodeToken(user.token);
          this._roles = this.decodedToken.role;
        }
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  logout(): void {
    this._token = null as any;
    this._usuario = null as any;
    this._navItems = [];
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('menu');
    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    });
  }

  isAuthenticated(): boolean {
    const token: any = sessionStorage.getItem('token');
    if (token === "" || token === null || token === undefined) {
      return false;
    }
    let autenticate = !this.tokenExpired(token);
    return autenticate;
  }

  private tokenExpired(token: string) {
    const expiryToken = (JSON.parse(atob(token.split('.')[1]))).exp;
    const ahora = Math.floor((new Date).getTime() / 1000);
    return  ahora >= expiryToken;
  }

  hasRole(role: string): boolean {  
    const roles: any = sessionStorage.getItem('roles');
    if (roles.includes(role)) {
      return true;
    }
    return false;
  }

}
