import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioservice: UsuarioService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      // console.log('Se usó el canActivate del guard');
      return this.usuarioservice.validarToken()
          .pipe(
            tap( estaAuntenticado => {
              if (!estaAuntenticado){
                this.router.navigateByUrl('/login');
              }
            })
          );
  }
  
}
