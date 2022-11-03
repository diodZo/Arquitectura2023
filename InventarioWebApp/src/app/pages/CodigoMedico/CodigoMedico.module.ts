import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CodigoMedicoRoutingModule } from './codigoMedico-routing.module';
import { SolicitudesPendientesComponent } from './solicitudesPendientes/solicitudesPendientes.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import SolicitudPorServicioComponent from './solicitudPorServicio/solicitudPorServicio.component';
import { MaterialModule } from 'src/app/core/helpers/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SolicitudDerivacionComponent } from './solicitudesPendientes/componentes/solicitudDerivacion/solicitudDerivacion.component';
import { IframesComponent } from 'src/app/core/helpers/iframes/iframes.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnularSolicitudComponent } from './solicitudesPendientes/componentes/anularSolicitud/anularSolicitud.component';
import { GetEmailUsuarioComponent } from 'src/app/core/helpers/GetEmailUsuario/GetEmailUsuario.component';
import { HistorialSolicitudesComponent } from './solicitudPorServicio/componentes/historialSolicitudes/historialSolicitudes.component';
import { EditarSolicitudComponent } from './solicitudPorServicio/componentes/editarSolicitud/editarSolicitud.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    CodigoMedicoRoutingModule,
  ],
  declarations: [
    SolicitudesPendientesComponent,
    SolicitudComponent,
    SolicitudPorServicioComponent,
    SolicitudDerivacionComponent,
    AnularSolicitudComponent,
    IframesComponent,
    GetEmailUsuarioComponent,
    HistorialSolicitudesComponent,
    EditarSolicitudComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CodigoMedicoModule {}
