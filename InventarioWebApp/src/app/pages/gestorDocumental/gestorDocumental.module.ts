import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DocumentosPendientesComponent } from "./documentosPendientes/documentosPendientes.component";
import { GestorDocumentalRoutingModule } from "./gestorDocumental-routing.module";

import { IngresoComponent } from "./ingreso/ingreso.component";
import { BrowserModule } from '@angular/platform-browser'


@NgModule({
    declarations: [      
        
    ],
    imports: [
      BrowserModule,
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      GestorDocumentalRoutingModule,
    ]
  })
  export class GestorDocumentalModule { }