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

  constructor(private mediaService: MediaService) {
    this.trendingTvShows$ = this.mediaService.getTrendingTvShows()
  }

}
