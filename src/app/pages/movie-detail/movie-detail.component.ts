import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from 'src/app/core/services/media.service';
import { toSignal } from '@angular/core/rxjs-interop';
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
    imports: [
        NgIf,
        MatChipsModule,
        NgFor,
        MatProgressSpinnerModule,
    ],
})
export class MovieDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  location = inject(Location);
  mediaService = inject(MediaService);
  params = toSignal(this.route.paramMap);
  movieDetail = this.mediaService.movieDetail;
  movieCredits = this.mediaService.movieCredits;

  ngOnInit(): void {
    this.mediaService.setMovieId(Number(this.params().get('id')));
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
    return this.mediaService.convertToImagePath(imagePath);
  }

  goBack() {
    this.location.back();
  }
}
