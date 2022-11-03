import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/helpers/guards/auth.guard";
import { RoleGuard } from "src/app/core/helpers/guards/role.guard";
import { environment } from "src/environments/environment";
import { IngresoInformeDesempenoComponent } from "./Desempeno/ingreso-informe-desempeno/ingreso-informe-desempeno.component";
import { ListaFuncionariosInformeDesempenoComponent } from "./Desempeno/lista-funcionarios-informe-desempeno/lista-funcionarios-informe-desempeno.component";
import { ValidacionInformeDesempenoComponent } from "./Desempeno/validacion-informe-desempeno/validacion-informe-desempeno.component";
import { ListadoFuncionariosComponent } from "./Funcionario/listado-funcionarios/listado-funcionarios.component";
import { NuevoFuncionarioComponent } from "./Funcionario/nuevo-funcionario/nuevo-funcionario.component";
import { JefesComponent } from "./Jefatura/jefes/jefes.component";
import { PeriodosComponent } from "./Periodos/periodos/periodos.component";
import { IngresoPreinformeComponent } from "./Preinforme/ingreso-preinforme/ingreso-preinforme.component";
import { ListaFuncionariosPreinformeComponent } from "./Preinforme/lista-Funcionarios-Preinforme/lista-Funcionarios-Preinforme.component";
import { IngresoProposicionComponent } from "./solicitudProposicion/ingreso/ingreso-proposicion/ingreso-proposicion.component";

const env_permisos = environment.permisos;

const routes: Routes = [
  
    { path: 'desempeno/funcionarios/ingreso/:id/:codigo', component: IngresoInformeDesempenoComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.RRHH_LISTA_FUNCIONARIOS, breadcrumb: 'ingreso' } },
    { path: 'desempeno/validacion/ingreso/:id', component: IngresoInformeDesempenoComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.RRHH_VALIDAR_DESEMPE, breadcrumb: 'ingreso' } },
    
    { path: 'desempeno/validacion', component: ValidacionInformeDesempenoComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.RRHH_VALIDAR_DESEMPE, breadcrumb: 'validacion' } },
    { path: 'desempeno/funcionarios', component: ListaFuncionariosInformeDesempenoComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.RRHH_LISTA_FUNCIONARIOS, breadcrumb: 'funcionarios' } },
    
    { path: 'funcionario/funcionarios', component: ListadoFuncionariosComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.RRHH_LISTA_JEFATURAS, breadcrumb: 'funcionarios' } },
    { path: 'funcionario/nuevo', component: NuevoFuncionarioComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.RRHH_LISTA_JEFATURAS, breadcrumb: 'nuevo'  } },
    { path: 'funcionario/editar/:id', component: NuevoFuncionarioComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.RRHH_LISTA_JEFATURAS, breadcrumb: 'editar'  } },
    
    { path: 'jefes', component: JefesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.RRHH_LISTA_JEFATURAS, breadcrumb: 'jefes'  } },
    { path: 'periodos', component: PeriodosComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.RRHH_LISTA_JEFATURAS, breadcrumb: 'periodos' } },

    { path: 'Preinforme/funcionarios/registro/:rut/:periodo', component: IngresoPreinformeComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.RRHH_PREINFORME, breadcrumb: 'registro' } },
    { path: 'Preinforme/funcionarios', component: ListaFuncionariosPreinformeComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.RRHH_PREINFORME, breadcrumb: 'Preinforme' } },    
    { path: 'Proposicion/ingreso', component: IngresoProposicionComponent, canActivate: [AuthGuard, RoleGuard], data: { role: env_permisos.RRHH_PREINFORME, breadcrumb: 'Proposicion' } },
    

  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RrhhRoutingModule { }