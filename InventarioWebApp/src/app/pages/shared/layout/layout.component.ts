import { Component, OnDestroy, OnInit } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { INavData } from 'src/app/core/helpers/model/sidebar-nav';
import { AlertifyService } from 'src/app/core/helpers/utility/Alertify.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { INavbarData } from '../sidenav/helps';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export default class LayoutComponent implements OnDestroy {
  
  nombreCompleto: string | any;
  navData!:  INavData[];
  tiempoInactivo = environment.tiempoInactivo;
  tiempoEsperaRespuesta = environment.tiempoEsperaRespuesta;
  title = 'sidenav';
  isSideNavCollapsed = false;
  screenWidth = 0;
  private subscriptions = new Subscription();

  constructor( 
    public authService: AuthService,
    private alertify: AlertifyService, 
    private spinner: NgxSpinnerService,
    private bnIdle: BnNgIdleService) { 
     this.nombreCompleto  = this.authService.NombreUsuario;
     this.navData         = this.authService.menu;
     this.ExpirarSessionUsuarioInactivo(this.authService, this.alertify, this.bnIdle);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    Swal.close();
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  logout(data: boolean): void {
    if(data){
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.authService.logout();
      }, 1000);
    }
  }

  ExpirarSessionUsuarioInactivo(
    authService: AuthService,
    alertify: AlertifyService,
    bnIdle: BnNgIdleService
  ): void {

    this.subscriptions.add(this.bnIdle.startWatching(this.tiempoInactivo).subscribe((res) => {
      if (res) {
        var timmer = setTimeout(function () {
          Swal.close();
          bnIdle.stopTimer();
          authService.logout();
          alertify.error('Session expirada');
        }, this.tiempoEsperaRespuesta);

        Swal.fire({
          title: 'Atención',
          text: 'Su sessión esta por expirar, ¿desea continuar en el sitio?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0d6efd',
          cancelButtonColor: '#dc3545',
          confirmButtonText: 'Si, deseo continuar',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            this.authService.refreshToken();
            this.alertify.success('Session renovada');
            this.bnIdle.stopTimer();
            bnIdle.resetTimer();
            clearTimeout(timmer);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.alertify.error('Session expirada');

            this.spinner.show();
            setTimeout(() => {
              this.spinner.hide();
              this.bnIdle.stopTimer();
              this.authService.logout();
              clearTimeout(timmer);
            }, 1000);
          }
        });
      }
    }));
  }

}
