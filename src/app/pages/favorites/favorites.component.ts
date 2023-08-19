import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'moma-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss'],
    standalone: true,
    imports: [
        NgFor,
        MovieCardComponent,
        AsyncPipe,
    ],
})
export class FavoritesComponent implements OnInit {
  authService = inject(AuthService);
  favorites$: Observable<any>;

  ngOnInit(): void {
    this.favorites$ = this.authService.getUserFavorites();
  }
}
