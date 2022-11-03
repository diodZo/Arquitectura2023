import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CodigoMedicoService } from '../../services/codigoMedico.service';

@Component({
  selector: 'app-GetEmailUsuario',
  templateUrl: './GetEmailUsuario.component.html',
  styleUrls: ['./GetEmailUsuario.component.scss']
})
export class GetEmailUsuarioComponent{

  constructor(public servicio: CodigoMedicoService, private router: Router) { }

  getEmailUsuario(usuarioX: any):void{
    this.servicio.getEmailByRut(usuarioX)
      .subscribe(data => {

        if(!data.correo){
          Swal.fire({
            icon: 'info',
            title: 'Informacion Importante!',
            html:'<div class=\"alert alert-info alert-dismissible\" role=\"alert\">Se detecta en sistema que: <br /><b>no tiene un email asociado a su cuenta</b>,<br /> favor actualizar desde su perfil de usuario</div>',
            showDenyButton: false,
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonText: 'Actualizar <i class=\"fa fa-edit\"></i>',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/configuracion/perfil'])
            }
          })
        }
      }      
    );
  }

}
