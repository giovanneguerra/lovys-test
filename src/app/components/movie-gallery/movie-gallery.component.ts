import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from 'src/app/shared/models/movie';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'moma-movie-gallery',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movie-gallery.component.html',
  styleUrls: ['./movie-gallery.component.scss'],
})
export class MovieGalleryComponent {
  @Input() movies: Movie[];
  router = inject(Router);

  onMovieClick(movieId: number) {
    this.router.navigate(['/movie-detail', movieId]);
  }
}
