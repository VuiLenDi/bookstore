import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.authenticationService.isLoggedIn().pipe(map(data => {
        if (data) {
          return true;
        } else {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return false;
        }
      }));
    }
}