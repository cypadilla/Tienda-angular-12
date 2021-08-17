import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class CompradorGuard implements CanActivate {

  constructor(
    private userService:UsersService,
    private router:Router
  ){}

  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const tipo = this.userService.getType();
      console.log('tipo de usuario',tipo)
       if(tipo != 'comprador'){
         this.router.navigateByUrl('/home')
         return false;
       }
        return true;
  }
  
}
