import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/core/helpers/material/material.module';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home.routing';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HomeRoutingModule,
    NgxSpinnerModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
