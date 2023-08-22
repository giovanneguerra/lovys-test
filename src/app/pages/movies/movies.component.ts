import {
  Component,
  EnvironmentInjector,
  Injector,
  OnInit,
  Signal,
  computed,
  effect,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of, tap } from 'rxjs';
import { MovieService } from 'src/app/core/services/movie.service';
import { Genre } from 'src/app/shared/models/genre';
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
    MatFormFieldModule,
    MatSelectModule,
    NgIf,
    NgFor,
    MatOptionModule,
    MovieGalleryComponent,
  ],
})
export class MoviesComponent implements OnInit {
  #formBuilder = inject(FormBuilder);
  #movieService = inject(MovieService);
  #injector = inject(Injector);

  movieGenres = this.#movieService.movieGenres;
  movieForm: FormGroup;
  search = signal(this.#movieService.selectedGenreId());
  movieListByGenre = this.#movieService.movieListByGenre;
  selectedGenreId: Genre;

  ngOnInit() {
    this.#initForm();
    toSignal(
      this.movieForm
        .get('selectedGenre')
        .valueChanges.pipe(
          tap((genreId) => this.#movieService.setSelectedGenreId(genreId))
        ),
      { injector: this.#injector }
    );
  }

  #initForm() {
    this.movieForm = this.#formBuilder.group({
      selectedGenre: [this.#movieService.selectedGenreId()],
    });
  }
}
