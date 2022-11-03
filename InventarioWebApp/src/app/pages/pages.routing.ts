import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/helpers/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import LayoutComponent from './shared/layout/layout.component';

const routes: Routes = [ 
    {
        path: 'inicio',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('./home/home.routing').then(m => m.HomeRoutingModule),        
        data: { breadcrumb: { disable: true, alias: 'inicio' } }
    },  
    {
        path: 'configuracion',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('./configuracion/configuracion.routing').then(m => m.ConfiguracionRoutingModule),        
        data: { breadcrumb: { disable: true, alias: 'Configuración' } }
    },
    {
        path: 'oficinaPartes',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('./OficinaPartes/oficinaPartes-routing.modules').then(m => m.OficinaPartesRoutingModule),        
        data: { breadcrumb: { disable: true, alias: 'Oficina Partes' } }
    },
    {
        path: 'CodigoMedico',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('./CodigoMedico/codigoMedico-routing.module').then(m => m.CodigoMedicoRoutingModule),
        data: { breadcrumb: { disable: true, alias: 'Código Médico' } }
    },
    {
        path: 'rrhh',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('./Rrhh/rrhh-routing.module').then(m => m.RrhhRoutingModule),
        data: { breadcrumb: { disable: true, alias: 'RRHH' } }
    },
    {
        path: 'gestorDocumental',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('./gestorDocumental/gestorDocumental-routing.module').then(m => m.GestorDocumentalRoutingModule),
        data: { breadcrumb: { disable: true, alias: 'Gestor Documental' } }
    },  
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
    providers: [ AuthGuard ]
})
export class PagesRoutingModule {}