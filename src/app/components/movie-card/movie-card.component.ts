import { Component, Input, inject } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'moma-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  mediaService = inject(MediaService);
  @Input() movie: Movie;

  displayImage(imagePath: string): string {
    return this.mediaService.convertToImagePath(imagePath);
  }

  displayTooltip(title: string): string | undefined {
    return title.length > 16 ? title : undefined;
  }
}
