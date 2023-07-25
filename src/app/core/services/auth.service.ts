import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private router: Router) {}
  
  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    console.log('logout');
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  getCurrentUser() {
    return this.auth.user;
  }

  isUserLoggedIn() {
    return this.auth.user;
  }
}
