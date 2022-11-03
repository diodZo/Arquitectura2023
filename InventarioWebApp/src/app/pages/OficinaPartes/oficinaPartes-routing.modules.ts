import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/helpers/guards/auth.guard";
import { RoleGuard } from "src/app/core/helpers/guards/role.guard";
import { environment } from "src/environments/environment";
import { BusquedaPartesComponent } from "./busqueda-partes/busqueda-partes.component";
import { IngresoComponent } from "./ingreso/ingreso.component";


const env_permisos = environment.permisos;

const routes: Routes = [
    { path: 'ingresoOP', component: IngresoComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.OFICINAPARTES_REGISTRO, breadcrumb: 'Ingreso' } },
    { path: 'BusquedaOP', component: BusquedaPartesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.OFICINAPARTES_BUSQUEDA, breadcrumb: 'Busqueda' } },
    
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class OficinaPartesRoutingModule { }