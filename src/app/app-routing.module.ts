import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { SignGuard } from './core/guards/sign.guard';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('./pages/movies/movies.component').then((c) => c.MoviesComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'movie-detail/:id',
    loadComponent: () =>
      import('./pages/movie-detail/movie-detail.component').then(
        (c) => c.MovieDetailComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites.component').then(
        (c) => c.FavoritesComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((c) => c.AuthComponent),
    canActivate: [SignGuard],
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((c) => c.AuthComponent),
    canActivate: [SignGuard],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
