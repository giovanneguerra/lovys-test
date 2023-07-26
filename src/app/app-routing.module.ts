import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { TvSeriesComponent } from './pages/tv-series/tv-series.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SignGuard } from './core/guards/sign.guard';
import { AuthComponent } from './pages/auth/auth.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: 'tv-series', component: TvSeriesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AuthComponent, canActivate: [SignGuard] },
  { path: 'sign-up', component: AuthComponent, canActivate: [SignGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
