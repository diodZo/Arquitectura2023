import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/core/helpers/utility/Alertify.service';
import { MustMatch } from 'src/app/core/helpers/validators/comparePass.validator';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfiguracionService } from 'src/app/core/services/configuracion.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent implements OnInit {
  model: any = {};
  submitted = false;
  changepassForm: any;
  passwordIsValid: any;

  oldpasswordhide = true;
  newpasswordhide = true;
  repitepasswordhide = true;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public configService: ConfiguracionService,
    private alertify: AlertifyService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.changepassForm = this.fb.group({
      oldpassword:    ['', [Validators.required ]],
      newpassword:    ['', [Validators.required, Validators.minLength(6) ]],
      repitepassword: ['', [Validators.required, Validators.minLength(6) ]]
    }, {
      validator: MustMatch('newpassword', 'repitepassword')
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.spinner.hide();
    }, 800);
  }

  get f() { return this.changepassForm.controls; }
  
  passwordValid(event:any) {
    this.passwordIsValid = event;
  }

  changePass() {
    this.spinner.show();
    this.submitted = true;

    if (this.changepassForm.invalid) {
      console.log(this.changepassForm)
      this.changepassForm.markAllAsTouched();
      this.spinner.hide();
      return;
    }

    this.configService.ChangePass(this.changepassForm.value).subscribe(
      data => {
        if(data.status == 200){
          this.alertify.success('Contraseña actualizada correctamente!');
          this.authService.logout();

          setTimeout(() => {
            this.spinner.hide();
            this.router.navigate(['/login']);           
          }, 1000);
        }
      },
      err => {
        this.spinner.hide();
        if(err.status == 404){
          return this.alertify.error('la contraseña actual no es valida');
        }
        this.alertify.error('Ha ocurrido un error, favor volver a intentar');
      }
    );
  }
}
