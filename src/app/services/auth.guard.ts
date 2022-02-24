import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {SocialAuthService} from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: SocialAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable(observer => {
      this.authService.authState.subscribe(user => observer.next(user !== null));
    });
  }
}
