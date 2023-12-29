import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Movie } from 'src/app/shared/models/movie';
import { AuthService } from './auth.service';
import {
  concatMap,
  exhaustMap,
  flatMap,
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  #auth = inject(AuthService);
  #db = inject(AngularFirestore);
  #http = inject(HttpClient);
  userFavoritesMovies = signal<Movie[]>([]);
  #apiUrl = 'https://api.themoviedb.org/3/';
  #apiKey = '0f60ad592a39d4b497a0d8889bba1be2';
  favorites = signal<Movie[]>([]);

  userFavoriteMovies$ = toObservable(this.#auth.user).pipe(
    switchMap((user) => {
      if (user.uid) {
        return this.#db
          .collection('favorites', (ref) => ref.where('userId', '==', user.uid))
          .snapshotChanges()
          .pipe(
            map((snaps) => {
              return snaps.map((snap) => {
                return snap.payload.doc.get('movieId');
              });
            }),
            exhaustMap((favoriteMovieIds) => {
              const movieRequests = favoriteMovieIds.map((movieId) =>
                this.#http.get<Movie>(
                  `${this.#apiUrl}movie/${movieId}?api_key=${
                    this.#apiKey
                  }&language=en-US`
                )
              );
              return forkJoin(movieRequests);
            }),
            tap((val) => console.log(val))
          );
      } else {
        return of([] as Movie[]);
      }
    })
  );
}
