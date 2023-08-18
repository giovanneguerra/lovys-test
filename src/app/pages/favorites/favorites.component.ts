import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'moma-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  authService = inject(AuthService);
  favorites$: Observable<any>;

  ngOnInit(): void {
    this.favorites$ = this.authService.getUserFavorites();
  }
}
