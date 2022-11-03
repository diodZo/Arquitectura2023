import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { sarht100Model } from 'src/app/core/models/CodigoMedico/sarht100Model';
import { UsuarioClass } from 'src/app/core/models/Usuario.model';
import { CodigoMedicoService } from 'src/app/core/services/codigoMedico.service';
import { environment } from 'src/environments/environment';
import { SolicitudDerivacionComponent } from './componentes/solicitudDerivacion/solicitudDerivacion.component';
import { finalize } from "rxjs/operators";
import { AuthService } from 'src/app/core/services/auth.service';
import { AnularSolicitudComponent } from './componentes/anularSolicitud/anularSolicitud.component';
import { GetEmailUsuarioComponent } from 'src/app/core/helpers/GetEmailUsuario/GetEmailUsuario.component';

@Component({
  providers: [GetEmailUsuarioComponent],
  selector: 'app-solicitudesPendientes',
  templateUrl: './solicitudesPendientes.component.html',
  styleUrls: ['./solicitudesPendientes.component.scss'],
})
export class SolicitudesPendientesComponent implements OnDestroy, OnInit, AfterViewInit
{
  isTrue = false;
  baseUrl = environment.apiGestorDocumental;
  usuarioX: UsuarioClass = JSON.parse(
    sessionStorage.getItem('usuario') || '{}'
  ) as UsuarioClass;

  dataSource = new MatTableDataSource<sarht100Model>();
  displayedColumns: string[] = [ 'rut', 'nombres','categoriaText', 'servicioText', 'contratacionText','fechaincio', 'fechatermino', 'usuarioIng', 'estado', 'acciones' ];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  private subscriptions = new Subscription();

  constructor(
    public authService: AuthService,
    public servicio: CodigoMedicoService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private comp: GetEmailUsuarioComponent   
  ) {}

  ngOnInit() {
    console.log("ngOnInit")
    this.spinner.show();
    this.cargarGrilla();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.spinner.hide();
    }, 800);
  }

  cargarGrilla() {
    this.subscriptions.add(
      this.servicio.getSolicitudesPendientes().subscribe((data) => {
       
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
    console.log("ngOnDestroy")
    this.subscriptions.unsubscribe();
    this.dialog.closeAll();
  }

  openDialog(element : any): void {

    const myCompDialog = this.dialog.open(SolicitudDerivacionComponent,{
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
          this.cargarGrilla();
          this.ngAfterViewInit();
        }
      });
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
          this.cargarGrilla();
          this.ngAfterViewInit();
        }
      });
  }
}
