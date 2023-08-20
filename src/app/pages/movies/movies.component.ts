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
import { tap } from 'rxjs';
import { MovieService } from 'src/app/core/services/movie.service';
import { Genre } from 'src/app/shared/models/genre';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor } from '@angular/common';
import { MovieGalleryComponent } from 'src/app/components/movie-gallery/movie-gallery.component';

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
    MatProgressSpinnerModule,
    MovieGalleryComponent,
  ],
})
export class MoviesComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  movieService = inject(MovieService);
  injector = inject(EnvironmentInjector);

  movieGenres = this.movieService.movieGenres;
  movieForm: FormGroup;
  searchResults: Signal<Genre>;
  movieListByGenre = this.movieService.movieListByGenre;
  selectedGenreId: Genre;

  ngOnInit() {
    this.initForm();
    runInInjectionContext(this.injector, () => {
      this.searchResults = toSignal<Genre>(
        this.movieForm.get('selectedGenre').valueChanges.pipe(
          tap((genreId) => {
            this.movieService.setSelectedGenreId(genreId);
          })
        )
      );
    });
  }

  private initForm() {
    this.movieForm = this.formBuilder.group({
      selectedGenre: [this.movieService.selectedGenreId()],
    });
  }
}
