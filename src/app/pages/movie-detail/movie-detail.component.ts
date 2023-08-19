import { Component, Input, OnInit, inject } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Location, NgIf, NgFor } from '@angular/common';
import { Crew } from 'src/app/shared/models/crew';
import { Cast } from 'src/app/shared/models/cast';
import { Credits } from 'src/app/shared/models/credits';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'moma-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  standalone: true,
  imports: [NgIf, MatChipsModule, NgFor, MatProgressSpinnerModule],
})
export class MovieDetailComponent implements OnInit {
  location = inject(Location);
  movieService = inject(MovieService);
  @Input() id = '';
  movieDetail = this.movieService.movieDetail;
  movieCredits = this.movieService.movieCredits;

  ngOnInit(): void {
    if (this.id) {
      this.movieService.setMovieId(Number(this.id));
    }
  }

  getMovieCredits(movieCredits: Credits, role?: string): Cast[] | Crew[] | [] {
    if (movieCredits) {
      if (role) {
        return movieCredits.crew
          .filter((crew) => crew.job === role)
          .slice(0, 3);
      }

      return movieCredits.cast.slice(0, 3);
    }
    return [];
  }

  displayImage(imagePath: string): string {
    return this.movieService.convertToImagePath(imagePath);
  }

  goBack() {
    this.location.back();
  }
}
