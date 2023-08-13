import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, startWith, switchMap } from 'rxjs';
import { MediaService } from 'src/app/core/services/media.service';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'moma-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit{
  router = inject(Router);
  mediaService = inject(MediaService);
  formBuilder = inject(FormBuilder);
  
  movieGenres = this.mediaService.movieGenres;
  selectedGenre: number;
  movieForm: FormGroup;
  searchResults$: Observable<Movie[]>;

  ngOnInit() {
    this.initForm();

    this.searchResults$ = this.movieForm.get('selectedGenre').valueChanges.pipe(
      startWith(null),
      switchMap(selectedGenre => {
        return selectedGenre ? this.mediaService.getMovieListByGenre(selectedGenre) : [];
      })
    ); 
  }

  private initForm() {
    this.movieForm = this.formBuilder.group({
      selectedGenre: [null]
    });
  }

  onMovieClick(movieId: number) {
    this.router.navigate(['/movie-detail', movieId]);
  }

}
