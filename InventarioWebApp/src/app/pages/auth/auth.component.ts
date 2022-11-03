import { Component, NgZone, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "src/app/core/services/auth.service";

import Swal from 'sweetalert2';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm!: FormGroup;
  payload: any;
  hide = true;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private ngZone: NgZone,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {    
    if (this.authService.isAuthenticated()) {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/configuracion/perfil');
      });
    }

    this.reactiveForm();
  }

  reactiveForm() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl; } {
      return this.loginForm.controls;
  }

  submitForm() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.spinner.show();

    let cambio = 0;
    this.authService.login(this.loginForm.value).subscribe({
      next: (val) => { 
        this.payload = this.authService.Roles;
        cambio       = this.authService.cambioPass();
        Swal.fire('BIENVENIDO', 'Al GESTOR DOCUMENTAL', 'success'); 
       },
      error: (err) => { 
        Swal.fire('Error', 'El usuario o contraseña son invalidos!', 'error');
        this.spinner.hide();},
      complete: () => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        
        if (cambio === 0) {
          this.router.navigate(['/configuracion/change-pass']);
          Swal.fire('Informacion Importante', "Se detecta en sistema que no ha cambiado su contraseña, favor proceder", 'info');
          return;
        }else{
          this.router.navigate(['/inicio/home']);
        }
      }     
  })
  }
}
