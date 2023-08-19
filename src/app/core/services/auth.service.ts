import { Injectable, inject, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Observable,
  Subject,
  from,
  map,
  mergeMap,
  of,
  switchMap,
  toArray,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(AngularFireAuth);
  db = inject(AngularFirestore);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  loading = signal(false);
  private apiUrl = 'https://api.themoviedb.org/3/';
  private apiKey = '0f60ad592a39d4b497a0d8889bba1be2';

  initForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getCurrentUserId(): Observable<string | null> {
    return this.auth.authState.pipe(map((user) => user?.uid || null));
  }

  getUserFavorites() {
    return this.getCurrentUserId().pipe(
      switchMap((currentUid) => {
        if (currentUid) {
          return this.db
            .collection('favorites', (ref) =>
              ref.where('userId', '==', currentUid)
            )
            .snapshotChanges()
            .pipe(
              map((snaps) => {
                return snaps.map((snap) => {
                  return snap.payload.doc.get('movieId');
                });
              }),
              switchMap((favoriteMovieIds) => {
                return from(favoriteMovieIds).pipe(
                  mergeMap((movieId) => {
                    return this.http.get<any>(
                      `${this.apiUrl}movie/${movieId}?api_key=${this.apiKey}&language=en-US`
                    );
                  }),
                  toArray()
                );
              })
            );
        } else {
          return of([]);
        }
      })
    );
  }

  onSubmit(isSignup: boolean, authForm: FormGroup) {
    this.loading.set(true);

    const email = authForm.value.email;
    const password = authForm.value.password;

    if (isSignup) {
      return this.auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.router.navigate(['/']);
          this.loading.set(false);
        })
        .catch((error) => {
          console.error('Login error:', error);
          return [];
        });
    } else {
      return this.auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.router.navigate(['/']);
          this.loading.set(false);
        })
        .catch((error) => {
          console.error('Register error:', error);
          return [];
        });
    }
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.auth.authState.pipe(map((user) => !!user));
  }
}
