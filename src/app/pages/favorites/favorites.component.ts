import { Component, OnInit, inject } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { NgFor, AsyncPipe } from '@angular/common';
import { MovieGalleryComponent } from 'src/app/components/movie-gallery/movie-gallery.component';
import { Movie } from 'src/app/shared/models/movie';
import { MovieService } from 'src/app/core/services/movie.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FavoritesService } from 'src/app/core/services/favorites.service';

@Component({
  selector: 'moma-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: true,
  imports: [NgFor, MovieCardComponent, AsyncPipe, MovieGalleryComponent],
})
export class FavoritesComponent implements OnInit {
  #favoritesService = inject(FavoritesService);
  favorites = toSignal<Movie[]>(this.#favoritesService.userFavoriteMovies$);

  ngOnInit(): void {
    console.log(this.#favoritesService.favorites());
  }
}
