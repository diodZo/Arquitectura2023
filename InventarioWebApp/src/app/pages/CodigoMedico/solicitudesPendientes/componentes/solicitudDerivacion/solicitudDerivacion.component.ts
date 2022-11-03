import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { IframesComponent } from 'src/app/core/helpers/iframes/iframes.component';
import { UsuarioClass } from 'src/app/core/models/Usuario.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CodigoMedicoService } from 'src/app/core/services/codigoMedico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudDerivacion',
  templateUrl: './solicitudDerivacion.component.html',
  styleUrls: ['./solicitudDerivacion.component.scss'],
})
export class SolicitudDerivacionComponent implements OnInit, AfterViewInit {

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
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

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

    entrada.rutInput    = entrada.rut + '-' + entrada.dv;    

    this.tieneTitulo            = entrada.certificadoTitulo ? true : false;
    this.tieneSuperIntendencia  = entrada.superIntendencia ? true : false;
    this.tieneEunacom           = entrada.eunacom ? true : false;
    this.tieneReconocimiento    = entrada.certificadoReconocimiento ? true : false;

    this.txtTitulo              = entrada.certificadoTitulo;
    this.txtSuperIntendencia    = entrada.superIntendencia;
    this.txtEunacom             = entrada.eunacom;
    this.txtReconocimiento      = entrada.certificadoReconocimiento;

    this.validadoTitulo         = entrada.vbcertificadoTitulo;
    this.validadoSuperIntendencia = entrada.vbsuperIntendencia;
    this.validadoEunacom        = entrada.vbeunacom;
    this.validadoReconocimiento = true;

    this.fechain                = entrada.fechaincio;
    this.fechater               = entrada.fechatermino;
    entrada.fechaincioTxt       = entrada.fechaincio;
    entrada.fechaterminoTxt     = entrada.fechatermino;
    this.formMedico.patchValue(entrada);
  }

  campoEsValidoMedico(campo: string): boolean | null {
    return (
      this.formMedico.controls[campo].errors &&
      this.formMedico.controls[campo].touched
    );
  }

  onChangeTitulo(value: any) {
    this.validadoTitulo = !value;

    this.formMedico.patchValue({
      obsTitulo: '',
      vbcertificadoTitulo: !value
    });
  }

  onChangeSuper(value: any) {
    this.validadoSuperIntendencia = !value;

    this.formMedico.patchValue({
      obsSuperIntendencia: '',
      vbsuperIntendencia: !value
    });
  }

  onChangeEunacom(value: any) {
    this.validadoEunacom = !value;

    this.formMedico.patchValue({
      obsEunacom: '',
      vbeunacom: !value
    });
  }

  onChangeReconocimiento(value: any) {
    this.validadoReconocimiento = !value;
    this.formMedico.patchValue({
      obsReconocimiento: '',
      vbcertificadoReconocimiento: !value
    });
  }

  VerDocumento(link: string) {  

    const dialogPDF = this.dialogModal.open(IframesComponent,{
      height: '100vh',
      width: '60vw',
      maxWidth: '60vw',
      disableClose: true, 
      data: link,
      position: {
        top: '0px',
        right: '0px'
      } 
    });

    dialogPDF.afterClosed().subscribe(result => {
      console.log('The dialogModal was closed');      
    });
  }

  btnDerivar(form: any):void {
    this.spinner.show();

    let obsTitulo           = this.formMedico.controls['obsTitulo'].value;
    let obsSuperIntendencia = this.formMedico.controls['obsSuperIntendencia'].value;
    let obsEunacom          = this.formMedico.controls['obsEunacom'].value;
    let obsReconocimiento   = this.formMedico.controls['obsReconocimiento'].value;

  
    let certificadoRecono =
      this.formMedico.controls['certificadoReconocimiento'].value;

    if (!this.validadoTitulo && obsTitulo == '') {
      Swal.fire(
        'Error',
        'Debe ingresar una observacion en certificado de titulo',
        'error'
      );
    }

    if (!this.validadoSuperIntendencia && obsSuperIntendencia == '') {
      Swal.fire(
        'Error',
        'Debe ingresar una observacion en certificado de Super intendencia',
        'error'
      );
    }

    if (!this.validadoEunacom && obsEunacom == '') {
      Swal.fire(
        'Error',
        'Debe ingresar una observacion en certificado de Eunacom',
        'error'
      );
    }

    if (certificadoRecono) {
      if (obsReconocimiento == '') {
        Swal.fire(
          'Error',
          'Debe ingresar una observacion en certificado de Reconocimiento',
          'error'
        );
      }
    }

    this.servicio
      .DerivarSolicitud(form.getRawValue(), this.usuarioX.rut)
      .subscribe((result: any) => {
        let rs = result;
        if (result) {
          if (rs.status) {            
           
            Swal.fire('Solicitud Derivada', rs.mensaje, 'success'); 
            this.okClick();        
          } else {
            Swal.fire('Error', rs.mensaje, 'error');
          }
        }
        this.spinner.hide();
      });
  }

  btnAprobar(form: any) {
    this.spinner.show();
    
    this.servicio
      .AprobarSolicitud(form.getRawValue(), this.usuarioX.rut)
      .subscribe((result: any) => {
        let rs = result;
        if (result) {
          if (rs.status) {
            Swal.fire('Solicitud Generada', `Código Médico: <b>${rs.body.model.codusuario}</b>`, 'success');           
            this.okClick();
          } else {
            Swal.fire('Error', rs.mensaje, 'error');
          }
        }
        this.spinner.hide();
      });
  }
}
