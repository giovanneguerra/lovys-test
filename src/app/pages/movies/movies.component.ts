import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, startWith, switchMap } from 'rxjs';
import { MediaService } from 'src/app/core/services/media.service';
import { Genre } from 'src/app/shared/models/genre';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit{
  movieGenres$: Observable<Genre[]>;
  movieDetail$: Observable<Movie>;
  selectedGenre: number;
  movieForm: FormGroup;
  searchResults$: Observable<Movie[]>;

  constructor(private mediaService: MediaService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.movieGenres$ = this.mediaService.getMovieGenres();
    this.movieDetail$ = this.mediaService.getMovieDetail(892);
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

}
