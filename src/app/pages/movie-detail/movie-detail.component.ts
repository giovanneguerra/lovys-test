import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { MediaService } from 'src/app/core/services/media.service';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'moma-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit{
  movieDetail$: Observable<Movie>;

  constructor(
    private route: ActivatedRoute,
    private mediaService: MediaService
  ) {}

  ngOnInit(): void {
    this.movieDetail$ = this.route.paramMap.pipe(
     switchMap(params => {
      const movieId = +params.get('id');
      return this.mediaService.getMovieDetail(movieId).pipe(
        catchError((error: any) => {
          console.error('Error fetching movie detail:', error);
          return of(null);
        })
      );
     })
    );
  }

  displayImage(imagePath: string): string {
    return `https://image.tmdb.org/t/p/w500${imagePath}`;
  }

}
