import { CdkMenuModule } from "@angular/cdk/menu";
import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../core/helpers/material/material.module";
import { PagesRoutingModule } from "./pages.routing";
import { BodyComponent } from "./shared/body/body.component";
import { HeaderComponent } from "./shared/header/header.component";
import LayoutComponent from "./shared/layout/layout.component";
import { SidenavComponent } from "./shared/sidenav/sidenav.component";
import { SublevelMenuComponent } from "./shared/sidenav/sublevel-menu.component";
import {BreadcrumbModule} from 'xng-breadcrumb';

@NgModule({
  declarations: [
    LayoutComponent,
    BodyComponent,
    HeaderComponent,
    SidenavComponent,
    SublevelMenuComponent,
  ],
  imports: [ 
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    PagesRoutingModule,
    BreadcrumbModule,

    CdkMenuModule,
    OverlayModule,
    MaterialModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
  })
  
  export class PageModule { }