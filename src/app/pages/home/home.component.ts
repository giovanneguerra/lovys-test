import { Component, inject } from '@angular/core';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'moma-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  mediaService = inject(MediaService);

  upComingMovies = this.mediaService.upComingMovies;
  topRatedMovies = this.mediaService.topRatedMovies;
  popularMovies = this.mediaService.popularMovies;

  displayImage(imagePath: string): string {
    return this.mediaService.convertToImagePath(imagePath);
  }

  displayTooltip(title: string): string | undefined {
    return title.length > 16 ? title : undefined;
  }
}
