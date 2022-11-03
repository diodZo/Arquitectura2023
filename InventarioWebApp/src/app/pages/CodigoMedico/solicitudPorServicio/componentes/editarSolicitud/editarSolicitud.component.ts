import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { IframesComponent } from 'src/app/core/helpers/iframes/iframes.component';
import { SolicitudCodigoMedicoModel } from 'src/app/core/models/CodigoMedico/solicitudCodigo';
import { UsuarioClass } from 'src/app/core/models/Usuario.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CodigoMedicoService } from 'src/app/core/services/codigoMedico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editarSolicitud',
  templateUrl: './editarSolicitud.component.html',
  styleUrls: ['./editarSolicitud.component.scss']
})
export class EditarSolicitudComponent implements OnInit, AfterViewInit {

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
    public dialogRef: MatDialogRef<EditarSolicitudComponent>,
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

      obsTitulo: [{ value: '', disabled: true }],
      obsSuperIntendencia:[{ value: '', disabled: true }],
      obsEunacom:[{ value: '', disabled: true }],
      obsReconocimiento: [{ value: '', disabled: true }],

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

    this.tieneTitulo = entrada.certificadoTitulo ? true : false;
    this.tieneSuperIntendencia = entrada.superIntendencia ? true : false;
    this.tieneEunacom = entrada.eunacom ? true : false;
    this.tieneReconocimiento = entrada.certificadoReconocimiento ? true : false;

    this.txtTitulo = entrada.certificadoTitulo;
    this.txtSuperIntendencia = entrada.superIntendencia;
    this.txtEunacom = entrada.eunacom;
    this.txtReconocimiento = entrada.certificadoReconocimiento;

    this.validadoTitulo = entrada.vbcertificadoTitulo;
    this.validadoSuperIntendencia = entrada.vbsuperIntendencia;
    this.validadoEunacom = entrada.vbeunacom;
    this.validadoReconocimiento = entrada.vbcertificadoReconocimiento;

    this.formMedico.patchValue(entrada);
  }

  campoEsValidoMedico(campo: string): boolean | null {
    return this.formMedico.controls[campo].errors
      && this.formMedico.controls[campo].touched;
  } 

  validarSelect(campo: string): boolean | null {
    return this.formMedico.controls[campo].value == '-1' && this.formMedico.controls[campo].touched;
  } 

  onChangeTitulo(value:any){
    this.validadoTitulo = !value;

    var x = this.formMedico;
    x.obsTitulo = '';
    x.vbcertificadoTitulo = !value;
    this.formMedico.patchValue(x);
  }

  onChangeSuper(value:any){
    this.validadoSuperIntendencia = !value;

    var x = this.formMedico;
    x.obsSuperIntendencia = '';
    x.vbsuperIntendencia = !value;
    this.formMedico.patchValue(x);
  }

  onChangeEunacom(value:any){
    this.validadoEunacom = !value;

    var x = this.formMedico;
    x.obsEunacom = '';
    x.vbeunacom = !value;
    this.formMedico.patchValue(x);
  }

  onChangeReconocimiento(value:any){
    this.validadoReconocimiento = !value;

    var x = this.formMedico;
    x.obsReconocimiento = '';
    x.vbcertificadoReconocimiento = !value;
    this.formMedico.patchValue(x);
  }

  onFileChangecertificadoTitulo(event: any) {

    console.log("onFileChangecertificadoTitulo", event.target.files[0])
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formMedico.patchValue({
        certificadoTituloFile: file
      });
    }
  }

  onFileChangeSuperIntendenciaFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formMedico.patchValue({
        superIntendenciaFile: file
      });
    }
  }
 
  onFileChangeEunacomFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formMedico.patchValue({
        eunacomFile: file
      });
    }
  }  

  onFileChangeCertificadoReconocimientoFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formMedico.patchValue({
        certificadoReconocimientoFile: file
      });
    }
  }  

  VerDocumento(link: string) {  

    console.log("VerDocumento", link)

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

  
  EditarDeribados(): void{
    this.spinner.show();

    if (this.formMedico.invalid) {
      this.spinner.hide();
      this.formMedico.markAllAsTouched();
      return;
    }

    let formulario = this.formMedico.value as SolicitudCodigoMedicoModel;
    let formData = new FormData();
    formData.append('certificadoTitulo', this.formMedico.controls['certificadoTituloFile'].value);
    formData.append('superIntendencia', this.formMedico.controls['superIntendenciaFile'].value);
    formData.append('eunacom', this.formMedico.controls['eunacomFile'].value);
    formData.append('certificadoReconocimiento', this.formMedico.controls['certificadoReconocimientoFile'].value);
    formData.append('jsonobject', JSON.stringify(formulario));

    this.servicio.editarDeribados(formData)
      .subscribe(
        (result: any) => {
          let rs = result;
          if (result) {
            if (rs.status) {     
              Swal.fire('Solicitud Realizada', rs.mensaje, 'success'); 
              this.okClick();        
            } else {
              Swal.fire('Error', rs.mensaje, 'error');
            }
          }
          this.spinner.hide();
        }
      );
  }


}
