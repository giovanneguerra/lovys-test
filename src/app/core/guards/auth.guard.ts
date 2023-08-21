import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  #authService = inject(AuthService);
  #router = inject(Router);

  canActivate(): boolean | UrlTree {
    return this.#authService.isUserLoggedIn()
      ? true
      : this.#router.createUrlTree(['/login']);
  }
}
