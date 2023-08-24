import { Component, Input, OnInit, inject } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Location, NgIf, NgFor, JsonPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieCreditsComponent } from 'src/app/components/movie-credits/movie-credits.component';
import { MovieGenresComponent } from 'src/app/components/movie-genres/movie-genres.component';
import { DisplayImagePipe } from 'src/app/shared/pipes/display-image.pipe';
import { MatIconModule } from '@angular/material/icon';

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
  ],
})
export class MovieDetailComponent implements OnInit {
  location = inject(Location);
  movieService = inject(MovieService);
  @Input() id = '';
  movieInfo = this.movieService.movieInfo;
  isMovieFavorite = this.movieService.isMovieFavorite;

  ngOnInit(): void {
    if (this.id) {
      this.movieService.setMovieId(Number(this.id));
    }
  }

  toggleFavorite() {
    this.movieService.toggleUserFavorite();
  }

  displayFavoriteMovie(isFavorite: boolean): string {
    return isFavorite ? 'favorite' : 'favorite_outline';
  }

  goBack() {
    this.location.back();
  }
}
