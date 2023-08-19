import { Component, Input, OnInit, inject } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Location, NgIf, NgFor, JsonPipe } from '@angular/common';
import { Crew } from 'src/app/shared/models/crew';
import { Cast } from 'src/app/shared/models/cast';
import { Credits } from 'src/app/shared/models/credits';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MovieCreditsComponent } from 'src/app/components/movie-credits/movie-credits.component';

@Component({
  selector: 'moma-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatChipsModule,
    NgFor,
    MatProgressSpinnerModule,
    JsonPipe,
    MovieCreditsComponent,
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

  displayImage(imagePath: string): string {
    return this.movieService.convertToImagePath(imagePath);
  }

  goBack() {
    this.location.back();
  }
}
