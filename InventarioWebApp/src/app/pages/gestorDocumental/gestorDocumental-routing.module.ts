import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/helpers/guards/auth.guard";
import { RoleGuard } from "src/app/core/helpers/guards/role.guard";
import { environment } from "src/environments/environment";
import { BusquedaRoutingSharedComponent } from "./busqueda-routing-shared/busqueda-routing-shared.component";
import { DocumentosPendientesComponent } from "./documentosPendientes/documentosPendientes.component";
import { HistorialComponent } from "./historial/historial.component";
import { IngresoV2Component } from "./ingreso-v2/ingreso-v2.component";
import { IngresoComponent } from "./ingreso/ingreso.component";


const env_permisos = environment.permisos;

const routes: Routes = [
    { path: 'bandeja', component: DocumentosPendientesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.GESTORDOCUMENTAL_BANDEJA_ENTRADA, breadcrumb: 'bandeja'} },
    { path: 'historial', component: HistorialComponent , canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.GESTORDOCUMENTAL_BUSQUEDA, breadcrumb: 'historial' } },
    { path: 'ingresoOld', component: IngresoComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.GESTORDOCUMENTAL_REGISTRO , breadcrumb: 'ingresoOld'} },    
    { path: 'ingreso', component: IngresoV2Component, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.GESTORDOCUMENTAL_REGISTRO, breadcrumb: 'ingreso' } },    
    { path: 'tipoBusqueda', component: BusquedaRoutingSharedComponent, canActivate: [AuthGuard, RoleGuard], data: { role:  env_permisos.GESTORDOCUMENTAL_BUSQUEDA, breadcrumb: 'tipoBusqueda' } },
    
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class GestorDocumentalRoutingModule { }