import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Servicio } from 'src/app/core/models/PerfilUsuario.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfiguracionService } from 'src/app/core/services/configuracion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit, AfterViewInit {
  isEmailDisabled = true;
  form: any;
  payload: any;
  icono: string = 'edit';

  servicios!: Servicio[];
  dataSource = new MatTableDataSource<Servicio>();
  displayedColumns: string[] = ['denominacion'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public configService: ConfiguracionService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.SetFormulario();
    this.CargarDatosPerfil();

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.payload = this.authService.usuario;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.spinner.hide();
    }, 800);
  }

  SetFormulario(){
    this.form = this.fb.group({
      codigo: [{ value: '', disabled: true }, Validators.required],
      rut: [{ value: '', disabled: true }, Validators.required],
      nombres: [{ value: '', disabled: true }, Validators.required],
      nombre2: [{ value: '', disabled: true }, Validators.required],
      apellpat: [{ value: '', disabled: true }, Validators.required],
      apellmat: [{ value: '', disabled: true }, Validators.required],
      direccion: [{ value: '', disabled: true }, Validators.required],
      comuna: [{ value: '', disabled: true }, Validators.required],
      funcionario: [{ value: '', disabled: true }, Validators.required],
      atencion: [{ value: '', disabled: true }, Validators.required],
      diagnostico: [{ value: '', disabled: true }, Validators.required],
      fono: [{ value: '', disabled: true }, Validators.required],
      fx: [{ value: '', disabled: true }, Validators.required],
      datares: [{ value: '', disabled: true }, Validators.required],
      estsalud: [{ value: '', disabled: true }, Validators.required],
      categoria: [{ value: '', disabled: true }, Validators.required],
      rolEnSistema: [{ value: '', disabled: true }, Validators.required],
      correo: [{ value: '', disabled: true }, Validators.required],
    });
  }

  CargarDatosPerfil() {
    this.spinner.show();
    this.configService.PerfilUsuario()
      .subscribe(x => {
        setTimeout(() => {
          this.spinner.hide();
          let rolUsuario = JSON.parse(sessionStorage.getItem('roles') || '{}')
          let user = x.usuario;
          user.rolEnSistema = rolUsuario[0].denominacion;
          this.form.patchValue(user);
          this.servicios = x.servicios;
          this.dataSource.data = this.servicios;
        }, 1000);
      });
  }

  EditarEmail() {

    this.form.controls["correo"].enable();

    this.isEmailDisabled = this.isEmailDisabled ? false : true;
    this.icono = this.isEmailDisabled ? "edit" : "save";

    if (this.isEmailDisabled) {
      Swal.fire({
        title: 'Guardar cambios',
        text: "Esta seguro de esta realizar el cambio?",
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          let emailNew = {
            correo: this.form.controls['correo'].value,
            tipo: 3,
            estado: 1,
            usuario: this.payload.rut,
            codusuario: this.payload.codigo,
          };

          this.configService.saveEmailChange(emailNew).subscribe(
            data => {      
              if(data){ 
                this.form.controls["correo"].disable();
                Swal.fire('Documento registrado', 'Documento registrado con exito!', 'success');
              }
            },
            err => {
              this.spinner.hide();    
            }
          );
        }
      })
    }
  }
}
