import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { Genre } from 'src/app/shared/models/genre';

@Component({
  selector: 'moma-movie-genres',
  standalone: true,
  imports: [CommonModule, MatChipsModule, NgFor],
  templateUrl: './movie-genres.component.html',
  styleUrls: ['./movie-genres.component.scss'],
})
export class MovieGenresComponent {
  @Input() genres: Genre[];
}
