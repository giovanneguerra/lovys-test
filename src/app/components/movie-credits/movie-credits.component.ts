import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Credits } from 'src/app/shared/models/credits';
import { Crew } from 'src/app/shared/models/crew';
import { Cast } from 'src/app/shared/models/cast';

@Component({
  selector: 'moma-movie-credits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-credits.component.html',
  styleUrls: ['./movie-credits.component.scss'],
})
export class MovieCreditsComponent {
  @Input() credits: Credits;

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
}
