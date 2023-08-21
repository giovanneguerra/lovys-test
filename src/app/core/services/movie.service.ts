import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import {
  catchError,
  map,
  mergeMap,
  shareReplay,
  switchMap,
  toArray,
} from 'rxjs/operators';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Genre } from 'src/app/shared/models/genre';
import { Movie } from 'src/app/shared/models/movie';
import { combineLatest, from, of } from 'rxjs';
import { MovieInformation } from 'src/app/shared/models/movie-information';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  http = inject(HttpClient);
  #db = inject(AngularFirestore);
  #auth = inject(AuthService);
  selectedGenreId = signal<Genre>(0 as Genre);
  #movieId = signal<number>(0);
  #apiUrl = 'https://api.themoviedb.org/3/';
  #apiKey = '0f60ad592a39d4b497a0d8889bba1be2';

  #movieGenres$ = this.http
    .get<any>(
      `${this.#apiUrl}genre/movie/list?api_key=${this.#apiKey}&language=en-US`
    )
    .pipe(
      map((data) => data.genres),
      shareReplay(1),
      catchError((error: any) => {
        console.error('API Error', error);
        return [];
      })
    );

  #upcomingMovies$ = this.http
    .get<any>(`${this.#apiUrl}movie/upcoming?api_key=${this.#apiKey}`)
    .pipe(
      map((data) => data.results.slice(0, 5)),
      shareReplay(1),
      catchError((error: any) => {
        console.error('API Error', error);
        return [];
      })
    );

  #popularMovies$ = this.http
    .get<any>(
      `${this.#apiUrl}movie/popular?api_key=${
        this.#apiKey
      }&language=en-US&page=1`
    )
    .pipe(
      map((data) => data.results.slice(0, 5)),
      shareReplay(1),
      catchError((error: any) => {
        console.error('API Error', error);
        return [];
      })
    );

  #topRatedMovies$ = this.http
    .get<any>(
      `${this.#apiUrl}movie/top_rated?api_key=${
        this.#apiKey
      }&language=en-US&page=1`
    )
    .pipe(
      map((data) => data.results.slice(0, 5)),
      shareReplay(1),
      catchError((error: any) => {
        console.error('API Error', error);
        return [];
      })
    );

  #movieListByGenre$ = toObservable(this.selectedGenreId).pipe(
    switchMap((genreId) => {
      const url = `${this.#apiUrl}discover/movie?api_key=${
        this.#apiKey
      }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`;
      return this.http.get<any>(url).pipe(
        map((data) => data.results.slice(0, 10)),
        shareReplay(1),
        catchError((error: any) => {
          console.error('API Error', error);
          return [];
        })
      );
    })
  );

  #movieDetail$ = toObservable(this.#movieId).pipe(
    switchMap((movieId) => {
      if (movieId) {
        const url = `${this.#apiUrl}movie/${movieId}?api_key=${
          this.#apiKey
        }&language=en-US`;
        return this.http.get<any>(url).pipe(
          shareReplay(1),
          catchError((error: any) => {
            console.error('API Error', error);
            return [];
          })
        );
      }
      return [] as Movie[];
    })
  );

  #movieCredits$ = toObservable(this.#movieId).pipe(
    switchMap((movieId) => {
      if (movieId) {
        const url = `${this.#apiUrl}movie/${movieId}/credits?api_key=${
          this.#apiKey
        }&language=en-US`;
        return this.http.get<any>(url).pipe(
          shareReplay(1),
          catchError((error: any) => {
            console.error('API Error', error);
            return [];
          })
        );
      }
      return [];
    })
  );

  #movieInfo$ = combineLatest([this.#movieDetail$, this.#movieCredits$]).pipe(
    map(([movieDetail, movieCredits]) => {
      return { detail: movieDetail, credits: movieCredits } as MovieInformation;
    })
  );

  getUserFavorites() {
    const currentUid = this.#auth.user().uid;
    if (currentUid) {
      return this.#db
        .collection('favorites', (ref) => ref.where('userId', '==', currentUid))
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
                return this.http.get<Movie[]>(
                  `${this.#apiUrl}movie/${movieId}?api_key=${
                    this.#apiKey
                  }&language=en-US`
                );
              }),
              toArray()
            );
          })
        );
    } else {
      return of([]);
    }
  }

  setSelectedGenreId(genreId: Genre) {
    this.selectedGenreId.set(genreId);
  }

  setMovieId(movieId: number) {
    this.#movieId.set(movieId);
  }

  movieGenres = toSignal<Genre[]>(this.#movieGenres$);
  upComingMovies = toSignal<Movie>(this.#upcomingMovies$);
  popularMovies = toSignal<Movie[]>(this.#popularMovies$);
  topRatedMovies = toSignal<Movie[]>(this.#topRatedMovies$);
  movieListByGenre = toSignal<Movie[]>(this.#movieListByGenre$);
  movieInfo = toSignal<any>(this.#movieInfo$);
}
