import {
  Component,
  EnvironmentInjector,
  OnInit,
  Signal,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { MovieService } from 'src/app/core/services/movie.service';
import { Genre } from 'src/app/shared/models/genre';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'moma-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    MatOptionModule,
    MovieCardComponent,
    MatProgressSpinnerModule,
  ],
})
export class MoviesComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  MovieService = inject(MovieService);
  injector = inject(EnvironmentInjector);

  movieGenres = this.MovieService.movieGenres;
  movieForm: FormGroup;
  searchResults: Signal<Genre>;
  movieListByGenre = this.MovieService.movieListByGenre;
  selectedGenreId: Genre;

  ngOnInit() {
    this.initForm();
    runInInjectionContext(this.injector, () => {
      this.searchResults = toSignal<Genre>(
        this.movieForm.get('selectedGenre').valueChanges.pipe(
          tap((genreId) => {
            this.MovieService.setSelectedGenreId(genreId);
          })
        )
      );
    });
  }

  private initForm() {
    this.movieForm = this.formBuilder.group({
      selectedGenre: [this.MovieService.selectedGenreId()],
    });
  }

  onMovieClick(movieId: number) {
    this.router.navigate(['/movie-detail', movieId]);
  }

  displayImage(imagePath: string): string {
    return this.MovieService.convertToImagePath(imagePath);
  }

  displayTooltip(title: string): string | undefined {
    return title.length > 16 ? title : undefined;
  }
}
