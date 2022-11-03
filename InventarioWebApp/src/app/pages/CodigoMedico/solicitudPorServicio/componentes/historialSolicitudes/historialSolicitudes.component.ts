import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { sarht100Model } from 'src/app/core/models/CodigoMedico/sarht100Model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CodigoMedicoService } from 'src/app/core/services/codigoMedico.service';

@Component({
  selector: 'app-historialSolicitudes',
  templateUrl: './historialSolicitudes.component.html',
  styleUrls: ['./historialSolicitudes.component.scss']
})
export class HistorialSolicitudesComponent implements OnInit, AfterViewInit, OnDestroy {

  historial: sarht100Model[] = [];
  private subscriptions = new Subscription();

  dataSource = new MatTableDataSource<sarht100Model>();
  displayedColumns: string[] = [ 'rut', 'nombres', 'solicitante','fecing', 'motivo','estado'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(    
    public authService: AuthService,
    public servicio: CodigoMedicoService,
    private fbMedico: FormBuilder,
    private spinner: NgxSpinnerService,
    public dialogModal: MatDialog, 
    public dialogRef: MatDialogRef<HistorialSolicitudesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit() {
    this.spinner.show();
    this.cargarGrilla(this.data);
  }

  ngAfterViewInit(): void { 
    setTimeout(() => {
      this.spinner.hide();
    }, 800);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.dialogModal.closeAll();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  okClick(): void {
    this.dialogRef.close(true);
  }

  cargarGrilla(entrada: any){
    this.subscriptions.add(this.servicio.getHistorialByCodReg(entrada).subscribe((data) => {

      data.forEach((x:any) => {
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

      console.log("data", data);
      this.dataSource = data;
    }));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
