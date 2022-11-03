import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

export interface HomeItems {
  url:     string;
  nombre:  string;
  permiso: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  env_permisos = environment.permisos;

  gestorDocumental: HomeItems[] = [
    { url: '/gestorDocumental/bandeja', nombre: 'Bandeja Entrada', permiso: this.env_permisos.GESTORDOCUMENTAL_BANDEJA_ENTRADA},
    { url: '/gestorDocumental/ingreso', nombre: 'Registro', permiso: this.env_permisos.GESTORDOCUMENTAL_REGISTRO },
    { url: '/gestorDocumental/historial', nombre: 'Busqueda', permiso: this.env_permisos.GESTORDOCUMENTAL_BUSQUEDA },
  ];

  oficinaPartes: HomeItems[] = [
    { url: '/oficinaPartes/BusquedaOP', nombre: 'Busqueda', permiso: this.env_permisos.OFICINAPARTES_BUSQUEDA },
    { url: '/oficinaPartes/ingresoOP', nombre: 'Registro', permiso: this.env_permisos.OFICINAPARTES_REGISTRO  },
  ];

  rrhh: HomeItems[] = [
    { url: '/rrhh/desempeno/funcionarios', nombre: 'Ingreso desempeño', permiso: this.env_permisos.RRHH_INGRESO_DESEMP },
    { url: '/rrhh/desempeno/validacion', nombre: 'Validar desempeño', permiso: this.env_permisos.RRHH_VALIDAR_DESEMPE},
    { url: '/rrhh/funcionario/funcionarios', nombre: 'Lista Funcionarios', permiso: this.env_permisos.RRHH_LISTA_FUNCIONARIOS },
    { url: '/rrhh/jefes', nombre: 'Lista Jefaturas', permiso: this.env_permisos.RRHH_LISTA_JEFATURAS },
  ];

  codigoMedico: HomeItems[] = [
    { url: '/CodigoMedico/solicitud', nombre: 'Solicitud', permiso: this.env_permisos.CODIGOMEDICO_SOLICITUD},
    { url: '/CodigoMedico/solicitudesPendientes', nombre: 'Pendientes', permiso: this.env_permisos.CODIGOMEDICO_PENDIENTES},
    { url: '/CodigoMedico/solicitudPorServicio', nombre: 'Pendientes por servicio', permiso: this.env_permisos.CODIGOMEDICO_PENDIENTES_POR_SERVICIO },
  ];
  
  constructor(public authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
   
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.spinner.hide();
    }, 800);
  }

}
