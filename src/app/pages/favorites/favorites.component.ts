import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { NgFor, AsyncPipe } from '@angular/common';
import { MovieGalleryComponent } from 'src/app/components/movie-gallery/movie-gallery.component';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'moma-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: true,
  imports: [NgFor, MovieCardComponent, AsyncPipe, MovieGalleryComponent],
})
export class FavoritesComponent implements OnInit {
  authService = inject(AuthService);
  favorites$: Observable<Movie[]>;

  ngOnInit(): void {
    this.favorites$ = this.authService.getUserFavorites();
  }
}
