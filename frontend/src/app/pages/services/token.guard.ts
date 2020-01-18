import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Routes, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {
  constructor(private nav: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem("TOKEN")){
      const expired = new JwtHelperService().isTokenExpired(localStorage.getItem("TOKEN"));
      console.log(expired)
      //const decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('TOKEN'));
      // const expired = this.jwtHelper.isTokenExpired(localStorage.getItem("TOKEN"));
      if(!expired) return true;
      this.nav.navigate(['/login']);
      return false;
    } else {
      this.nav.navigate(['/login']);
      return false;
    }
  }

}
