import { Component, inject } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { MoviesListComponent } from '../../components/movies-list/movies-list.component';

@Component({
  selector: 'moma-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MoviesListComponent],
})
export class HomeComponent {
  MovieService = inject(MovieService);

  upComingMovies = this.MovieService.upComingMovies;
  topRatedMovies = this.MovieService.topRatedMovies;
  popularMovies = this.MovieService.popularMovies;
}
