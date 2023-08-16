import { Component, Input, Signal, inject } from '@angular/core';
import { MediaService } from 'src/app/core/services/media.service';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'moma-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent {
  mediaService = inject(MediaService);
  @Input() title: string;
  @Input() moviesList: Signal<Movie[]>;

  displayImage(imagePath: string): string {
    return this.mediaService.convertToImagePath(imagePath);
  }

  displayTooltip(title: string): string | undefined {
    return title.length > 16 ? title : undefined;
  }
}
