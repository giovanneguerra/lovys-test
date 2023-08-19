import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Genre } from 'src/app/shared/models/genre';
import { Movie } from 'src/app/shared/models/movie';
import { ActivatedRoute } from '@angular/router';
import { Credits } from 'src/app/shared/models/credits';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  selectedGenreId = signal<Genre>(0 as Genre);
  private movieId = signal<number>(0);
  private apiUrl = 'https://api.themoviedb.org/3/';
  private apiKey = '0f60ad592a39d4b497a0d8889bba1be2';

  private movieGenres$ = this.http
    .get<any>(
      `${this.apiUrl}genre/movie/list?api_key=${this.apiKey}&language=en-US`
    )
    .pipe(
      map((data) => data.genres),
      shareReplay(1),
      catchError((error: any) => {
        console.error('API Error', error);
        return [];
      })
    );

  private upcomingMovies$ = this.http
    .get<any>(`${this.apiUrl}movie/upcoming?api_key=${this.apiKey}`)
    .pipe(
      map((data) => data.results.slice(0, 5)),
      shareReplay(1),
      catchError((error: any) => {
        console.error('API Error', error);
        return [];
      })
    );

  private popularMovies$ = this.http
    .get<any>(
      `${this.apiUrl}movie/popular?api_key=${this.apiKey}&language=en-US&page=1`
    )
    .pipe(
      map((data) => data.results.slice(0, 5)),
      shareReplay(1),
      catchError((error: any) => {
        console.error('API Error', error);
        return [];
      })
    );

  private topRatedMovies$ = this.http
    .get<any>(
      `${this.apiUrl}movie/top_rated?api_key=${this.apiKey}&language=en-US&page=1`
    )
    .pipe(
      map((data) => data.results.slice(0, 5)),
      shareReplay(1),
      catchError((error: any) => {
        console.error('API Error', error);
        return [];
      })
    );

  private movieListByGenre$ = toObservable(this.selectedGenreId).pipe(
    switchMap((genreId) => {
      const url = `${this.apiUrl}discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`;
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

  private movieDetail$ = toObservable(this.movieId).pipe(
    switchMap((movieId) => {
      if (movieId) {
        const url = `${this.apiUrl}movie/${movieId}?api_key=${this.apiKey}&language=en-US`;
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

  private movieCredits$ = toObservable(this.movieId).pipe(
    switchMap((movieId) => {
      if (movieId) {
        const url = `${this.apiUrl}movie/${movieId}/credits?api_key=${this.apiKey}&language=en-US`;
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

  setSelectedGenreId(genreId: Genre) {
    this.selectedGenreId.set(genreId);
  }

  setMovieId(movieId: number) {
    this.movieId.set(movieId);
  }

  convertToImagePath(imagePath: string): string {
    return `https://image.tmdb.org/t/p/w500${imagePath}`;
  }

  movieGenres = toSignal<Genre[]>(this.movieGenres$);
  upComingMovies = toSignal<Movie>(this.upcomingMovies$);
  popularMovies = toSignal<Movie[]>(this.popularMovies$);
  topRatedMovies = toSignal<Movie[]>(this.topRatedMovies$);
  movieListByGenre = toSignal<Movie[]>(this.movieListByGenre$);
  movieDetail = toSignal<Movie>(this.movieDetail$);
  movieCredits = toSignal<Credits>(this.movieCredits$);
}
