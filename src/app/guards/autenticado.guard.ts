import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoGuard implements CanActivate {

  constructor(
    private userService:UsersService,
    private router:Router
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.userService.getToken();
      console.log('token de acceso',token)
       if(!token){
         this.router.navigateByUrl('/login')
         return false;
       }
        return true;
  }
  
}
