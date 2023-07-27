import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {
  movieGenre$: Observable<any[]>;
  movieListByGenre$: Observable<any[]>;
  movieDetail$: Observable<any[]>;

  constructor(private mediaService: MediaService) {
    this.movieGenre$ = this.mediaService.getMovieGenres();
    this.movieListByGenre$ = this.mediaService.getMovieListByGenre(27);
    this.movieDetail$ = this.mediaService.getMovieDetail(892);
  }

}
