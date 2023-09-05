import { Component, inject } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { MoviesListComponent } from '../../components/movies-list/movies-list.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'moma-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MoviesListComponent],
})
export class HomeComponent {
  movieService = inject(MovieService);
  upComingMovies = toSignal<Movie[]>(this.movieService.upcomingMovies$);
  topRatedMovies = toSignal<Movie[]>(this.movieService.topRatedMovies$);
  popularMovies = toSignal<Movie[]>(this.movieService.popularMovies$);
}
