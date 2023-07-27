import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  trendingTvShows$: Observable<any[]>;
  topRatedMovies$: Observable<any[]>;
  popularMovies$: Observable<any[]>;
  

  constructor(private mediaService: MediaService) {
    this.trendingTvShows$ = this.mediaService.getTrendingTvShows();
    this.topRatedMovies$ = this.mediaService.getTopRatedMovies();
    this.popularMovies$ = this.mediaService.getPopularMovies();
  }

}
