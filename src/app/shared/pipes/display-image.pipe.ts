import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayImage',
  standalone: true,
})
export class DisplayImagePipe implements PipeTransform {
  transform(imagePath: string): string {
    return `https://image.tmdb.org/t/p/w500${imagePath}`;
  }
}
