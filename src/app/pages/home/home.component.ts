import { Component, inject } from '@angular/core';
import { MediaService } from 'src/app/core/services/media.service';
import { MoviesListComponent } from '../../components/movies-list/movies-list.component';

@Component({
    selector: 'moma-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [MoviesListComponent],
})
export class HomeComponent {
  mediaService = inject(MediaService);

  upComingMovies = this.mediaService.upComingMovies;
  topRatedMovies = this.mediaService.topRatedMovies;
  popularMovies = this.mediaService.popularMovies;
}
