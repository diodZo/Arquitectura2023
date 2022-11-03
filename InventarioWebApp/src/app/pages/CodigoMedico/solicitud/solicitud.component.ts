import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { GetEmailUsuarioComponent } from 'src/app/core/helpers/GetEmailUsuario/GetEmailUsuario.component';
import { SelectModel, SelectModelV2 } from 'src/app/core/models/CodigoMedico/selectModel';
import { SolicitudCodigoMedicoModel } from 'src/app/core/models/CodigoMedico/solicitudCodigo';
import { Servicio } from 'src/app/core/models/PerfilUsuario.model';
import { UsuarioClass } from 'src/app/core/models/Usuario.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CodigoMedicoService } from 'src/app/core/services/codigoMedico.service';
import Swal from 'sweetalert2';

@Component({
  providers: [GetEmailUsuarioComponent],
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit, OnDestroy, AfterViewInit {

  formSearch: any;
  formMedico: any;
  categoria: SelectModel[] = [];
  TipoUsuarioX: number = 0;
  selectSistema: number = -1;
  selectSistemaToEmpresa: number = 0;
  tieneCodigo: boolean = false;
  servicios: Servicio[] = [];
  sisContratacion: SelectModelV2[] = [];
  rutOcultoX: any;
  dvOcultoX: any;

  idCategoria: any;
  submitted = false;
  TipoUsuarioBlock = true;

  fileAccept= ".pdf,.PDF, .jpg, .JPG";
  fakecertificadoTituloFile = "SIN ARCHIVO";
  fakeSuperIntendenciaFile = "SIN ARCHIVO";
  fakeEunacomFile = "SIN ARCHIVO";
  fakeReconocimientoFile = "SIN ARCHIVO";

  usuarioX: UsuarioClass = JSON.parse(sessionStorage.getItem('usuario') || '{}') as UsuarioClass;

  private subscriptions = new Subscription();

  constructor(
    public servicio: CodigoMedicoService,
    public authService: AuthService,
    private fbSearch: FormBuilder, 
    private fbMedico: FormBuilder,
    private spinner: NgxSpinnerService,
    private comp: GetEmailUsuarioComponent   
    ) {
   }

  ngOnInit() {
    this.spinner.show();

    this.formSearch = this.fbSearch.group({
      rut: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
    });

    this.formMedico = this.fbMedico.group({
      rutInput                            : [{ value: ''}, [Validators.required]],
      nombres                             : [{ value: '', disabled: false }, [Validators.required]],
      nombre2                             : [{ value: '', disabled: false }, [Validators.required]],
      apellpat                            : [{ value: '', disabled: false }, [Validators.required]],
      apellmat                            : [{ value: '', disabled: false }, [Validators.required]],
      categoriaId                         : [{ value: '-1', disabled: false }, [Validators.required]],
      servicioId                          : [{ value: '-1', disabled: false }, [Validators.required]],
      contratacionId                      : [{ value: '-1', disabled: false }, [Validators.required]],
      certificadoTitulo                   : [{ value: '', disabled: false }],
      superIntendencia                    : [{ value: '', disabled: false },],
      eunacom                             : [{ value: '', disabled: false },],
      certificadoReconocimiento           : [''],
      fechaInicio                         : [''],
      fechaFin                            : [''],
      correo                              : ['', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      codusuario                          : [''],

      certificadoTituloFile               : [''],
      superIntendenciaFile                : [''],
      eunacomFile                         : [''],
      certificadoReconocimientoFile       : [''],

      usring                              : [this.usuarioX.rut],
      rutOculto                           : [''],
      dvOculto                            : [''],
      dv                                  : [''],
      rut                                 : [''],
      empresaID                           : ['0'],
      estado                              : ['0'],
      fechaincioTxt                       : ['', [Validators.required]],
      fechaterminoTxt                     : ['', [Validators.required]],
    });
   
    this.categoria = this.getCategoria();
    this.cargarServicios();
    this.cargarSistemaCotratacion();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.spinner.hide();
    }, 800);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

   // CARGA DE DATOS
  getCategoria() {
    return [
      new SelectModel (22, 'Becado'),
      new SelectModel (1, 'Medico'),
    ];
  }

  GetUsuario():void {

    if (this.formSearch.invalid) {
      this.formSearch.markAllAsTouched();
      return;
    }

    this.spinner.show();
    this.subscriptions.add(
          this.servicio.GetUsuario(this.formSearch.value).subscribe({
          next: (x) => { 
                this.formMedico.reset();
                let user = x;
                user.rutInput = user.rut +'-'+ user.digitover;
                this.TipoUsuarioX = x.TipoUsuario;
                this.tieneCodigo = (x.codusuario ? true : false)
                this.TipoUsuarioBlock = (x.TipoUsuario == 3 ? false: true);
                x.categoriaId      = '-1'; 
                x.servicioId       = '-1'; 
                x.contratacionId   = '-1'; 
                this.selectSistema = -1;
                const dato   = user.rutInput.split("-");
                x.rutOculto = dato[0];
                x.dvOculto  = dato[1];
                x.dv        = dato[1];
                x.estado    = 1;
                x.usring    = this.usuarioX.rut;
                this.submitted = true;
                this.formMedico.patchValue(x);
          },
          error: (err) => { 
              this.spinner.hide();

              if (err.status == 401) {
                return Swal.fire(
                  'Error',
                  'Rut Invalido',
                  'error'
                );
              }

             if(err.status == 409){
                return Swal.fire(
                  'Atención!',
                  'El rut ingresado, ya cuenta con una solicitud',
                  'info'
                )
              } 
              
              return  Swal.fire(
                'Error',
                'Algo salió mal, favor volver a intentar!',
                'error'
              );
          },
          complete: () => {
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
          }     
      })
  );
  }

  cargarServicios() {
    this.subscriptions.add(
      this.servicio.cargarServicios()
        .subscribe( (serv: Servicio[]) => {
          this.servicios = serv;
        })
    );
  }

  cargarSistemaCotratacion() {
    this.subscriptions.add(
      this.servicio.cargarSistemaCotratacion()
      .subscribe( (sis: SelectModelV2[]) => {
        this.sisContratacion = sis;
      })
    );
  }

  onChangeContratacion(campo: any){  

    this.selectSistema = campo;

    if(this.selectSistema == 1){
      this.selectSistemaToEmpresa = 1;
    }else{
      this.selectSistemaToEmpresa = 0;
    }
    
    if( this.selectSistema !== -1 && this.selectSistema !== 3 && this.selectSistema !== 5){
      this.submitted = true;
      this.formMedico.controls["certificadoTitulo"].setValidators([Validators.required]);
      this.formMedico.controls["superIntendencia"].setValidators([Validators.required]);
      this.formMedico.controls["eunacom"].setValidators([Validators.required]);
    }else{  
      this.submitted = false;
      this.formMedico.controls["certificadoTitulo"].clearValidators();
      this.formMedico.controls["superIntendencia"].clearValidators();
      this.formMedico.controls["eunacom"].clearValidators();
    }
  } 



  // VALIDACIONES
  campoEsValido(campo: string): boolean | null {
    return this.formSearch.controls[campo].touched && this.formSearch.controls[campo].errors;
  }

  campoEsValidoMedico(campo: string): boolean | null {
    if(this.formMedico.controls[campo].errors && this.formMedico.controls[campo].touched){
      this.submitted = true;
      return true;
    }else{
      this.submitted = false;
      return false;
    }
  } 

  validarCampoCorreo(campo: string): void {
    if(this.formMedico.controls[campo].invalid && this.formMedico.controls[campo].errors!['pattern']){
      this.submitted = true;
    }else{
      this.submitted = false;
    }
  } 

  validarSelect(campo: string): boolean | null {

    if (this.formMedico.controls[campo].value == '-1' && this.formMedico.controls[campo].touched) {
      this.submitted = true;
      return true;
    }else{
      this.submitted = false;
      return false;
    }
    
  } 

  validateFechaInicio(campo: string, comparar: string) : boolean | null {
    if(this.formMedico.controls[campo].value != undefined 
        && this.formMedico.controls[campo].value != "" 
        && this.formMedico.controls[comparar].value != undefined 
        && this.formMedico.controls[comparar].value != ""){

      if (this.formMedico.controls[campo].value > this.formMedico.controls[comparar].value) {
        this.submitted = true;
        return true;
      }
      this.submitted = false;
    }
    return false;
  }

  validateFechaFin(campo: string, comparar: string) : boolean | null {
    if(this.formMedico.controls[campo].value != undefined 
        && this.formMedico.controls[campo].value != "" 
        && this.formMedico.controls[comparar].value != undefined 
        && this.formMedico.controls[comparar].value != ""){
      if (this.formMedico.controls[campo].value < this.formMedico.controls[comparar].value) {
        this.submitted = true;
        return true;
      }  
      this.submitted = false;
    }
    return false;
  }

   // ONCHANGE ARCHIVOS
  onFileChangecertificadoTitulo(event: any) {
    if (event.target.files.length > 0) {
      const file                     = event.target.files[0];
      this.fakecertificadoTituloFile = event.target.files[0].name;      
      this.formMedico.patchValue({
        certificadoTituloFile: file
      });
      this.submitted = false;
    }else{
      this.submitted = true;
    }
  }

  onFileChangeSuperIntendenciaFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fakeSuperIntendenciaFile = event.target.files[0].name;
      this.formMedico.patchValue({
        superIntendenciaFile: file
      });
      this.submitted = true;
    }else{
      this.submitted = false;
    }
  }
 
  onFileChangeEunacomFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fakeEunacomFile = event.target.files[0].name;
      this.formMedico.patchValue({
        eunacomFile: file
      });
      this.submitted = true;
    }else{
      this.submitted = false;
    }
  }  

  onFileChangeCertificadoReconocimientoFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fakeReconocimientoFile = event.target.files[0].name;
      this.formMedico.patchValue({
        certificadoReconocimientoFile: file
      });
      this.submitted = true;
    }else{
      this.submitted = false;
    }
  }  

  Enviar(): void{   
    this.spinner.show();

    if (!this.formMedico.valid) {

      setTimeout(()=>{     
        this.spinner.hide();
      }, 800);

      this.formMedico.markAllAsTouched();
      return;
    }

    if (this.formMedico.valid && !this.submitted) {

      if(this.TipoUsuarioX == 3){

        let rutvariable = this.formMedico.controls['rutInput'].value;

        if(rutvariable.indexOf("-") == -1 || rutvariable.indexOf(".") >= 0){
          this.spinner.hide();
          Swal.fire('Error', 'Formato de Rut invalido, <br /> debe ir sin puntos y con un guión <br /> Ejemplo: 1111111-1', 'error');
          return;
        }

        this.formMedico.get('rutOculto').setValue(rutvariable.split("-")[0]);
        this.formMedico.get('dvOculto').setValue(rutvariable.split("-")[1]);
        this.formMedico.get('dv').setValue(rutvariable.split("-")[1]);                
    }

      let formulario = this.formMedico.value as SolicitudCodigoMedicoModel;
      var formData = new FormData();
      formData.append('certificadoTitulo', this.formMedico.controls['certificadoTituloFile'].value);
      formData.append('superIntendencia', this.formMedico.controls['superIntendenciaFile'].value);
      formData.append('eunacom', this.formMedico.controls['eunacomFile'].value);
      formData.append('certificadoReconocimiento', this.formMedico.controls['certificadoReconocimientoFile'].value);
      formData.append('jsonobject', JSON.stringify(formulario));
  
      this.subscriptions.add(
                this.servicio.subirSolicitud(formData)
                    .subscribe(
                      (result: any) => {
                        let rs = result;
                        if (result) {
                          this.submitted = false;
              
                          if (rs.status) {
                          Swal.fire('Solicitud Realizada', rs.mensaje, 'success');
                            this.formMedico.reset();
                            this.formMedico.categoriaId       = '-1'; 
                            this.formMedico.servicioId        = '-1'; 
                            this.tieneCodigo                  = false;
                            this.TipoUsuarioX                 = 0;
                            this.TipoUsuarioBlock             = true;

                             this.fakecertificadoTituloFile   = "SIN ARCHIVO";
                             this.fakeSuperIntendenciaFile    = "SIN ARCHIVO";
                             this.fakeEunacomFile             = "SIN ARCHIVO";
                            this.fakeReconocimientoFile       = "SIN ARCHIVO";
              
                            this.formSearch.reset();
                            this.ngOnInit();
              
                          } else {
                            Swal.fire('Error', rs.mensaje, 'error');
                          }
                        }         
                      setTimeout(()=>{     
                          this.spinner.hide();
                        }, 1500);
                      }
                    )
      );
    }  
  }
}
