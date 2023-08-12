import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaService } from 'src/app/core/services/media.service';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'moma-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  trendingTvShows = this.mediaService.trendingTvShows;
  topRatedMovies = this.mediaService.topRatedMovies;
  popularMovies = this.mediaService.popularMovies;
  
  constructor(private mediaService: MediaService) {}

}
