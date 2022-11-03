import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {OverlayModule} from '@angular/cdk/overlay';
import {CdkMenuModule} from '@angular/cdk/menu';

import { MaterialModule } from './core/helpers/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './pages/auth/auth.module';

import { NgxSpinnerModule } from "ngx-spinner";
import { PageModule } from './pages/pages.module';
import { ConfiguracionModule } from './pages/configuracion/configuracion.module';
import { JwtModule } from '@auth0/angular-jwt';
import {BreadcrumbModule} from 'xng-breadcrumb';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/helpers/Interceptor/token.interceptor';
import { AuthIntecrceptor } from './core/helpers/Interceptor/auth.interceptor';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPaginatorIntl } from './core/helpers/utility/paginatorIntl';
import { HomeModule } from './pages/home/home.module';
import { OfinaPartesModule } from './pages/OficinaPartes/ofina-partes.module';
import { CodigoMedicoModule } from './pages/CodigoMedico/CodigoMedico.module';
import { OficinaPartesModule } from './pages/Rrhh/rrhh.module';
import { GestorDocumentalModule } from './pages/gestorDocumental/gestorDocumental.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { registerLocaleData } from '@angular/common';

import localeEsCL from '@angular/common/locales/es-CL';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

registerLocaleData(localeEsCL, 'es-CL');

export function tokenGetter() {
  return localStorage.getItem("token");
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    //librerias
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    OverlayModule,
    CdkMenuModule,
    MaterialModule,
    BreadcrumbModule,
    FlexLayoutModule, 
    JwtModule.forRoot({
      config: {
       tokenGetter: tokenGetter,
       allowedDomains: ["localhost:4200", "foo.com", "bar.com"]
      },
    }),

    //modulos componentes
    AuthModule,
    PageModule,
    ConfiguracionModule,
    OfinaPartesModule,
    CodigoMedicoModule,
    OficinaPartesModule,
    GestorDocumentalModule,
    HomeModule
  ],
  providers: [
    BnNgIdleService,
    { provide: LOCALE_ID, useValue: 'es-CL' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthIntecrceptor, multi: true },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    { provide: MatPaginatorIntl, useValue: getPaginatorIntl() }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
