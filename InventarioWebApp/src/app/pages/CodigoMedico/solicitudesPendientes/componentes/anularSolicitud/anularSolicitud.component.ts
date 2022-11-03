import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioClass } from 'src/app/core/models/Usuario.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CodigoMedicoService } from 'src/app/core/services/codigoMedico.service';
import { SolicitudDerivacionComponent } from '../solicitudDerivacion/solicitudDerivacion.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-anularSolicitud',
  templateUrl: './anularSolicitud.component.html',
  styleUrls: ['./anularSolicitud.component.scss']
})
export class AnularSolicitudComponent implements OnInit, AfterViewInit{

  formMedico: any;  
  tieneTitulo = false;
  tieneSuperIntendencia = false;
  tieneEunacom = false;
  tieneReconocimiento = false;

  validadoTitulo = true;
  validadoSuperIntendencia = true;
  validadoEunacom = true;
  validadoReconocimiento = true;

  txtTitulo = '';
  txtSuperIntendencia = '';
  txtEunacom = '';
  txtReconocimiento = '';

  fechain = '';
  fechater = '';

  tieneCodigo = false;

  usuarioX: UsuarioClass = JSON.parse(
    sessionStorage.getItem('usuario') || '{}'
  ) as UsuarioClass;
  
  constructor( 
    public authService: AuthService,
    public servicio: CodigoMedicoService,
    private fbMedico: FormBuilder,
    private spinner: NgxSpinnerService,
    public dialogModal: MatDialog, 
    public dialogRef: MatDialogRef<SolicitudDerivacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

    ngOnInit() {

      this.spinner.show();
  
      this.formMedico = this.fbMedico.group({
        codigo: [''],
        rutInput: [{ value: '', disabled: true }, [Validators.required]],
        nombres: [{ value: '', disabled: true }, [Validators.required]],
        nombre2: [{ value: '', disabled: true }, [Validators.required]],
        apellpat: [{ value: '', disabled: true }, [Validators.required]],
        apellmat: [{ value: '', disabled: true }, [Validators.required]],
  
        certificadoTitulo: [{ value: '', disabled: false }],
        superIntendencia: [{ value: '', disabled: false }],
        eunacom: [{ value: '', disabled: false }],
        certificadoReconocimiento: [''],
        correo: [
          { value: '', disabled: true },
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
        codusuario: [''],
  
        certificadoTituloFile: [''],
        superIntendenciaFile: [''],
        eunacomFile: [''],
        certificadoReconocimientoFile: [''],
  
        IdcertificadoTitulo: [''],
        IdsuperIntendencia: [''],
        Ideunacom: [''],
        IdcertificadoReconocimiento: [''],
  
        usring: [this.usuarioX.rut],
        usrmod: [this.usuarioX.rut],
        rutOculto: [''],
        dvOculto: [''],
        dv: [''],
        rut: [''],
        estado: ['0'],
        fechaincioTxt: [''],
        fechaterminoTxt: [''],
        categoriaText: [{ value: '', disabled: true }],
        servicioText: [{ value: '', disabled: true }],
        fechaincio: [{ value: '', disabled: true }],
        fechatermino: [{ value: '', disabled: true }],
        contratacionText: [{ value: '', disabled: true }],
  
        obsTitulo: [''],
        obsSuperIntendencia: [''],
        obsEunacom: [''],
        obsReconocimiento: [''],
  
        vbcertificadoTitulo: [''],
        vbsuperIntendencia: [''],
        vbeunacom: [''],
        vbcertificadoReconocimiento: [''],
        colorEstado: [''],
  
        categoriaId: [''],
        servicioId: [''],
        contratacionId: [''],
        codregini: [''],
        motivo: ['', [Validators.required]],
        fecing: [''],
        formatFecha:[{ value: false}], 
      });
  
      this.cargarDatos(this.data);
    }
  
    ngAfterViewInit(): void { 
      setTimeout(() => {
        this.spinner.hide();
      }, 800);
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    okClick(): void {
      this.dialogRef.close(true);
    }

    cargarDatos(entrada: any){ 
      entrada.rutInput = entrada.rut + '-' + entrada.dv;
      this.fechain = entrada.fechaincio;
      this.fechater = entrada.fechatermino;
      entrada.fechaincioTxt = entrada.fechaincio;
      entrada.fechaterminoTxt = entrada.fechatermino;

      this.formMedico.patchValue(entrada);
    }

    btnAnular(form: any) {
      Swal.fire({
        title: 'Anular Solicitud',
        text: 'Esta seguro de anular esta solcitud',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, Anular!',
        cancelButtonText: 'No, cancelar!'
      }).then((result) => {
        if (result.value) {
  
          this.spinner.show();
          this.servicio
              .anularSolicitud(form.getRawValue(), this.usuarioX.rut)
              .subscribe((result: any) => {
                let rs = result;
                if (result) {
                  if (rs.status) {
                    Swal.fire('Solicitud Anulada', rs.mensaje, 'success');
                    this.okClick();  
                  } else {
                    Swal.fire('Error', rs.mensaje, 'error');
                  }
                }
                this.spinner.hide();
              });
        }
  
        return;
      })
    }
}
