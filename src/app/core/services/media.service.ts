import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUrl = 'https://api.themoviedb.org/3/trending/tv/day';
  private apiKey = '0f60ad592a39d4b497a0d8889bba1be2';

  constructor(private http: HttpClient) { }

  getTrendingTvShows(): Observable<any> {
    const url = `${this.apiUrl}?api_key=${this.apiKey}`;

    return this.http.get<any>(url)
      .pipe(
        catchError((error: any) => {
          console.error('API Error', error);
          return [];
        })
      );
  }
}
