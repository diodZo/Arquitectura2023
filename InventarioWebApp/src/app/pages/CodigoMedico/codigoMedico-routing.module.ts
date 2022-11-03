import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/helpers/guards/auth.guard";
import { RoleGuard } from "src/app/core/helpers/guards/role.guard";
import { environment } from "src/environments/environment";
import { SolicitudComponent } from "./solicitud/solicitud.component";
import { SolicitudesPendientesComponent } from "./solicitudesPendientes/solicitudesPendientes.component";
import SolicitudPorServicioComponent from "./solicitudPorServicio/solicitudPorServicio.component";


const env_permisos = environment.permisos;

const routes: Routes = [
    { path: 'solicitud', component: SolicitudComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.CODIGOMEDICO_SOLICITUD_PAGE, breadcrumb: 'Solicitud'  } },
    { path: 'solicitudesPendientes', component: SolicitudesPendientesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.CODIGOMEDICO_PENDIENTES, breadcrumb: 'Solicitudes Pendientes' }  },
    { path: 'solicitudPorServicio', component: SolicitudPorServicioComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.CODIGOMEDICO_PENDIENTES_POR_SERVICIO, breadcrumb: 'Solicitud Por Servicio' } },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CodigoMedicoRoutingModule { }