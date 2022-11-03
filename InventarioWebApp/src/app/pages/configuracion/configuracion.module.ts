import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfiguracionRoutingModule } from './configuracion.routing';
import { PerfilComponent } from './perfil/perfil.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import {BreadcrumbModule} from 'xng-breadcrumb';
import { MaterialModule } from 'src/app/core/helpers/material/material.module';
import { PasswordComponent } from './change-pass/password/password.component';

@NgModule({  
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BreadcrumbModule,
    MaterialModule,
    ConfiguracionRoutingModule,
  ],
  declarations: [
    PerfilComponent,
    ChangePassComponent,
    PasswordComponent
  ],
})
export class ConfiguracionModule { }
