import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { NgFor, AsyncPipe } from '@angular/common';
import { MovieGalleryComponent } from 'src/app/components/movie-gallery/movie-gallery.component';
import { Movie } from 'src/app/shared/models/movie';
import { MovieService } from 'src/app/core/services/movie.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'moma-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: true,
  imports: [NgFor, MovieCardComponent, AsyncPipe, MovieGalleryComponent],
})
export class FavoritesComponent implements OnInit {
  movieService = inject(MovieService);
  favorites$: Observable<Movie[]>;

  ngOnInit(): void {
    this.favorites$ = this.movieService.getUserFavorites();
  }
}
