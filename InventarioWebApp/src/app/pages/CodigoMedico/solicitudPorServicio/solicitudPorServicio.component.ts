import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, Subscription } from 'rxjs';
import { GetEmailUsuarioComponent } from 'src/app/core/helpers/GetEmailUsuario/GetEmailUsuario.component';
import { sarht100Model } from 'src/app/core/models/CodigoMedico/sarht100Model';
import { UsuarioClass } from 'src/app/core/models/Usuario.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CodigoMedicoService } from 'src/app/core/services/codigoMedico.service';
import { environment } from 'src/environments/environment';
import { AnularSolicitudComponent } from '../solicitudesPendientes/componentes/anularSolicitud/anularSolicitud.component';
import { EditarSolicitudComponent } from './componentes/editarSolicitud/editarSolicitud.component';
import { HistorialSolicitudesComponent } from './componentes/historialSolicitudes/historialSolicitudes.component';

@Component({
  providers: [GetEmailUsuarioComponent],
  selector: 'app-solicitudPorServicio',
  templateUrl: './solicitudPorServicio.component.html',
  styleUrls: ['./solicitudPorServicio.component.scss']
})
export default class SolicitudPorServicioComponent implements OnInit, OnDestroy, AfterViewInit {

  isTrue = false;
  baseUrl = environment.apiGestorDocumental;
  usuarioX: UsuarioClass = JSON.parse(
    sessionStorage.getItem('usuario') || '{}'
  ) as UsuarioClass;

  tieneTitulo            = false;
  tieneSuperIntendencia  = false;
  tieneEunacom           = false;
  tieneReconocimiento    = false;

  validadoTitulo            = true;
  validadoSuperIntendencia  = true;
  validadoEunacom           = true;
  validadoReconocimiento    = true;
  
  txtTitulo            = '';
  txtSuperIntendencia  = '';
  txtEunacom           = '';
  txtReconocimiento    = '';

  private subscriptions = new Subscription();

  dataSource = new MatTableDataSource<sarht100Model>();
  displayedColumns: string[] = [ 'rut', 'nombres','categoriaText', 'servicioText', 'contratacionText','fechaincio', 'fechatermino', 'usuarioIng', 'estado', 'acciones' ];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  
  constructor(  
    public authService: AuthService,
    public servicio: CodigoMedicoService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private comp: GetEmailUsuarioComponent   ) {}  



  ngOnInit() {
    this.spinner.show();
    this.cargarGrillaXServicio();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.spinner.hide();
    }, 800);
  }

  cargarGrillaXServicio() {
    this.subscriptions.add(
      this.servicio.getSolicitudesByUsuario(this.usuarioX).subscribe((data) => {
       
        data.forEach((x: any) => {
          switch (x.estado) {
            case 1:
              x.tipoEstado = 'SOLICITADO';
              x.colorEstado = 'bg-warning bg-gradient';
              break;
            case 2:
              x.tipoEstado = 'CON OBSERVACIONES';
              x.colorEstado = 'bg-primary bg-gradient';
              break;
            case 3:
              x.tipoEstado = 'GENERADO';
              x.colorEstado = 'bg-success bg-gradient';
              break;
            default:
              x.tipoEstado = 'ANULADO';
              x.colorEstado = 'bg-danger bg-gradient';
              break;
          }
        });
        this.dataSource.data = data;
      })
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.dialog.closeAll();
  }

  openDialogAnular(element : any): void {

    const myCompDialog = this.dialog.open(AnularSolicitudComponent,{
      height: '100vh',
          width: '70vw',
          maxWidth: '70vw',
          disableClose: true, 
          data: element,
          position: {
            top: '0px',
            right: '0px'
          } 
    });

    myCompDialog
      .afterClosed()
      .pipe(finalize(() => console.log("completed")))
      .subscribe((data:any) => {
        if(data){          
          this.spinner.show();
          this.cargarGrillaXServicio();
          this.ngAfterViewInit();
        }
      });
  }

  openHistorialModal(element : any): void {

    const myCompDialog = this.dialog.open(HistorialSolicitudesComponent,{
      height: '100vh',
          width: '70vw',
          maxWidth: '70vw',
          disableClose: true, 
          data: element,
          position: {
            top: '0px',
            right: '0px'
          } 
    });

    myCompDialog
      .afterClosed()
      .pipe(finalize(() => console.log("completed")))
      .subscribe((data:any) => {
        if(data){          
          this.spinner.show();
          this.cargarGrillaXServicio();
          this.ngAfterViewInit();
        }
      });
  }

  editarDerivacionModal(element : any): void {

    const myCompDialog = this.dialog.open(EditarSolicitudComponent,{
      height: '100vh',
          width: '70vw',
          maxWidth: '70vw',
          disableClose: true, 
          data: element,
          position: {
            top: '0px',
            right: '0px'
          } 
    });

    myCompDialog
      .afterClosed()
      .pipe(finalize(() => console.log("completed")))
      .subscribe((data:any) => {
        if(data){          
          this.spinner.show();
          this.cargarGrillaXServicio();
          this.ngAfterViewInit();
        }
      });
  }

}
