import { Component } from '@angular/core';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {
  trendingTvShows: any[];

  constructor(private mediaService: MediaService) {}

  ngOnInit() {
    this.loadTrendingTvShows();
  }

  loadTrendingTvShows() {
    this.mediaService.getTrendingTvShows().subscribe(
      (data: any) => {
        this.trendingTvShows = data.results;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }

}
