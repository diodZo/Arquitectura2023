import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthComponent } from "./auth.component";


@NgModule({
    declarations: [
      AuthComponent,
    ],
    exports: [
      AuthComponent,
    ],
    imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      BrowserAnimationsModule,

      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      NgxSpinnerModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class AuthModule { }