import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/helpers/guards/auth.guard';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Perfil de usuario' } },
  { path: 'change-pass', component: ChangePassComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Cambiar Contraseña' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
