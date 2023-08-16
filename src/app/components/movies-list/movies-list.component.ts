import { Component, Input, Signal, inject } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'moma-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent {
  @Input() title: string;
  @Input() moviesList: Signal<Movie[]>;
}
