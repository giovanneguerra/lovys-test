import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { Genre } from 'src/app/shared/models/genre';
import { Movie } from 'src/app/shared/models/movie';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  private apiUrl = 'https://api.themoviedb.org/3/';
  private apiKey = '0f60ad592a39d4b497a0d8889bba1be2';

  private trendingTvShows$ = this.http.get<any>(`${this.apiUrl}trending/tv/day?api_key=${this.apiKey}`)
    .pipe(
      map(data => data.results),
      shareReplay(1),
      catchError((error: any) => {
        console.error('API Error', error);
        return [];
      })
    );

  private movieGenres$ = this.http.get<any>(`${this.apiUrl}genre/movie/list?api_key=${this.apiKey}&language=en-US`)
    .pipe(
      map(data => data.genres),
      catchError((error: any) => {
        console.error('API Error', error);
        return [];
      })
    );
  
  private popularMovies$ = this.http.get<any>(`${this.apiUrl}tv/popular?api_key=${this.apiKey}&language=en-US&page=1`)
    .pipe(
      map(data => data.results),
      catchError((error: any) => {
        console.error('API Error', error);
        return [];
      })
    );

  private topRatedMovies$ = this.http.get<any>(`${this.apiUrl}tv/top_rated?api_key=${this.apiKey}&language=en-US&page=1`)
    .pipe(
      map(data => data.results),
      catchError((error: any) => {
        console.error('API Error', error);
        return [];
      })
    );

  getMovieListByGenre(genre: Genre): Observable<Movie[]> {
    const url = `${this.apiUrl}discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}`;
    return this.http.get<any>(url)
      .pipe(
        map(data => data.results),
        catchError((error: any) => {
          console.error('API Error', error);
          return [];
        })
      );
  }

  getMovieDetail(movieId: number): Observable<Movie> {
    const url = `${this.apiUrl}movie/${movieId}?api_key=${this.apiKey}&language=en-US`;
    return this.http.get<any>(url)
      .pipe(
        catchError((error: any) => {
          console.error('API Error', error);
          return [];
        })
      );
  }

  trendingTvShows = toSignal<Movie[]>(this.trendingTvShows$);
  movieGenres = toSignal<Genre[]>(this.movieGenres$);
  popularMovies = toSignal<Movie[]>(this.popularMovies$);
  topRatedMovies = toSignal<Movie[]>(this.topRatedMovies$);
}
