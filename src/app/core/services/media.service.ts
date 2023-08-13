import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Genre } from 'src/app/shared/models/genre';
import { Movie } from 'src/app/shared/models/movie';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUrl = 'https://api.themoviedb.org/3/';
  private apiKey = '0f60ad592a39d4b497a0d8889bba1be2';

  constructor(private http: HttpClient) { }

  getTrendingTvShows(): Observable<Movie[]> {
    const url = `${this.apiUrl}trending/tv/day?api_key=${this.apiKey}`;

    return this.http.get<any>(url)
      .pipe(
        map(data => data.results),
        catchError((error: any) => {
          console.error('API Error', error);
          return [];
        })
      );
  }
  
  getMovieGenres(): Observable<Genre[]> {
    const url = `${this.apiUrl}genre/movie/list?api_key=${this.apiKey}&language=en-US`;
    return this.http.get<any>(url)
      .pipe(
        map(data => data.genres),
        catchError((error: any) => {
          console.error('API Error', error);
          return [];
        })
      );

  }
  getPopularMovies(): Observable<Movie[]> {
    const url = `${this.apiUrl}tv/popular?api_key=${this.apiKey}&language=en-US&page=1`;
    return this.http.get<any>(url)
      .pipe(
        map(data => data.results),
        catchError((error: any) => {
          console.error('API Error', error);
          return [];
        })
      );
  }

  getTopRatedMovies(): Observable<any> {
    const url = `${this.apiUrl}tv/top_rated?api_key=${this.apiKey}&language=en-US&page=1`;
    return this.http.get<any>(url)
      .pipe(
        map(data => data.results),
        catchError((error: any) => {
          console.error('API Error', error);
          return [];
        })
      );
  }

  getMovieListByGenre(genre: Genre): Observable<Genre> {
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
}
