import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #auth = inject(AngularFireAuth);
  #router = inject(Router);
  #formBuilder = inject(FormBuilder);
  loading = signal(false);
  userId = localStorage.getItem('uid');
  #user = toSignal(this.#auth.authState);
  user = computed(
    () => ({ email: this.#user()?.email, uid: this.#user()?.uid } as User)
  );

  initForm(): FormGroup {
    return this.#formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  onSubmit(isSignup: boolean, authForm: FormGroup) {
    this.loading.set(true);

    const email = authForm.value.email;
    const password = authForm.value.password;

    this.#userAuthenticationMethod(email, password, isSignup);
  }

  #processAuthAction(authAction: () => Promise<any>) {
    authAction()
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        this.#onAuthenticationSuccess(uid);
      })
      .catch((error) => {
        console.error('Register error:', error);
        return [];
      });
  }

  #userAuthenticationMethod(
    email: string,
    password: string,
    isSignup: boolean
  ): void {
    const authMethod = isSignup
      ? () => this.#auth.createUserWithEmailAndPassword(email, password)
      : () => this.#auth.signInWithEmailAndPassword(email, password);
    this.#processAuthAction(authMethod);
  }

  #onAuthenticationSuccess(uid: string) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('uid', uid);
    this.#router.navigate(['/']);
    this.loading.set(false);
  }

  logout() {
    this.#auth.signOut().then(() => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('uid');
      this.#router.navigate(['/login']);
    });
  }
}
