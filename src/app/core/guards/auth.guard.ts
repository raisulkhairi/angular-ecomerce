import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../authentication/auth.service";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    console.log('router guard',route);
    console.log('state guard',state);
    return inject(AuthService).isLoggedlIn() ? true : inject(Router).createUrlTree(['/login'])
}