import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { AlertifyService } from "../utility/Alertify.service";
import { AuthService } from "../../services/auth.service";


@Injectable()
export class AuthIntecrceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(e => {
        if (e.status == 401) {
          if (this.authService.isAuthenticated()) {
            this.authService.logout();
          }
          this.router.navigate(['/login']);
        }

        if (e.status == 403) {
          this.alertify.warning("`No tienes acceso a este recurso!`")
          this.router.navigate(['/gestorDocumental/bandeja']);
        }
        return throwError(e);
      })
    );
  }
}
