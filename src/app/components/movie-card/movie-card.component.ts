import { Component, Input, inject } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie';
import { MediaService } from 'src/app/core/services/media.service';
import { Router } from '@angular/router';

@Component({
  selector: 'moma-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  mediaService = inject(MediaService);
  router = inject(Router);
  @Input() movie: Movie;

  displayImage(imagePath: string): string {
    return this.mediaService.convertToImagePath(imagePath);
  }

  onMovieClick(movieId: number) {
    this.router.navigate(['/movie-detail', movieId]);
  }
}
