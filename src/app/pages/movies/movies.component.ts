import { Component, EnvironmentInjector, OnInit, Signal, effect, inject, runInInjectionContext } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, startWith, switchMap, tap } from 'rxjs';
import { MediaService } from 'src/app/core/services/media.service';
import { Genre } from 'src/app/shared/models/genre';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'moma-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit{
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  mediaService = inject(MediaService);
  injector  = inject(EnvironmentInjector);
  
  movieGenres = this.mediaService.movieGenres;
  movieForm: FormGroup;
  searchResults: Signal<Genre>;
  movieListByGenre = this.mediaService.movieListByGenre;
  selectedGenreId: Genre;

  ngOnInit() {
    this.initForm();
    runInInjectionContext(this.injector, () => {
      this.searchResults = toSignal<Genre>(this.movieForm.get('selectedGenre').valueChanges.pipe(
        tap(genreId => {
          this.mediaService.setSelectedGenreId(genreId);
        })
      ));
    });

  }

  private initForm() {
    this.movieForm = this.formBuilder.group({
      selectedGenre: [this.mediaService.selectedGenreId()]
    });
  }

  onMovieClick(movieId: number) {
    this.router.navigate(['/movie-detail', movieId]);
  }

  displayImage(imagePath: string): string {
    return this.mediaService.convertToImagePath(imagePath);
  }

  displayTooltip(title: string): string | undefined {
    return title.length > 16 ? title : undefined;
  }

}
