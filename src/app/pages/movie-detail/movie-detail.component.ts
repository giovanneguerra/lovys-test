import { Component, OnInit, inject } from '@angular/core';
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
  route = inject(ActivatedRoute);
  mediaService = inject(MediaService);
  movieDetail$: Observable<Movie>;

  ngOnInit(): void {
    this.movieDetail$ = this.route.paramMap.pipe(
     switchMap(params => {
      const movieId = Number(params.get('id'));
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
    return this.mediaService.convertToImagePath(imagePath);
  }

}
