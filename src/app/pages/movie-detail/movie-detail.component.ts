import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Location, NgIf, NgFor, JsonPipe, AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieCreditsComponent } from 'src/app/components/movie-credits/movie-credits.component';
import { MovieGenresComponent } from 'src/app/components/movie-genres/movie-genres.component';
import { DisplayImagePipe } from 'src/app/shared/pipes/display-image.pipe';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { Movie } from 'src/app/shared/models/movie';
import { FavoritesService } from 'src/app/core/services/favorites.service';

@Component({
  selector: 'moma-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatProgressSpinnerModule,
    JsonPipe,
    MovieCreditsComponent,
    MovieGenresComponent,
    DisplayImagePipe,
    MatIconModule,
    AsyncPipe,
  ],
})
export class MovieDetailComponent implements OnInit {
  #location = inject(Location);
  #movieService = inject(MovieService);
  #favoritesService = inject(FavoritesService);
  @Input() id = '';
  movieInfo = toSignal<any>(this.#movieService.movieInfo$);
  userFavoriteMovies = toSignal<Movie[]>(
    this.#favoritesService.userFavoriteMovies$
  );
  isMovieFavorite = computed(() => {
    return this.userFavoriteMovies()?.filter(
      (val) => val.id === Number(this.id)
    );
  });
  // isMovieFavorite = this.#movieService.isMovieFavorite;

  ngOnInit(): void {
    if (this.id) {
      this.#movieService.setMovieId(Number(this.id));
    }
  }

  toggleFavorite() {
    this.#movieService.toggleMovieFavorite();
  }

  displayFavoriteMovie(isFavorite: boolean): string {
    return isFavorite ? 'favorite' : 'favorite_outline';
  }

  goBack() {
    this.#location.back();
  }
}
