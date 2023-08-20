import { Component, Input, OnInit, inject } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Location, NgIf, NgFor, JsonPipe } from '@angular/common';
import { Crew } from 'src/app/shared/models/crew';
import { Cast } from 'src/app/shared/models/cast';
import { Credits } from 'src/app/shared/models/credits';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MovieCreditsComponent } from 'src/app/components/movie-credits/movie-credits.component';
import { MovieGenresComponent } from 'src/app/components/movie-genres/movie-genres.component';
import { DisplayImagePipe } from 'src/app/shared/pipes/display-image.pipe';

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
  ],
})
export class MovieDetailComponent implements OnInit {
  location = inject(Location);
  movieService = inject(MovieService);
  @Input() id = '';
  movieInfo = this.movieService.movieInfo;

  ngOnInit(): void {
    if (this.id) {
      this.movieService.setMovieId(Number(this.id));
    }
  }

  goBack() {
    this.location.back();
  }
}
