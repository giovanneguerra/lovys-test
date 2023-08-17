import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaService } from 'src/app/core/services/media.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';

@Component({
  selector: 'moma-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  location = inject(Location);
  mediaService = inject(MediaService);
  params = toSignal(this.route.paramMap);
  movieDetail = this.mediaService.movieDetail;

  ngOnInit(): void {
    this.mediaService.setMovieDetail(Number(this.params().get('id')));
  }

  displayImage(imagePath: string): string {
    return this.mediaService.convertToImagePath(imagePath);
  }

  goBack() {
    this.location.back();
  }
}
