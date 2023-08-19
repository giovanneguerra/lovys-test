import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'noDescription',
    standalone: true
})
export class NoDescriptionPipe implements PipeTransform {

  transform(value: string): string {
    return value.length > 0 ? value : 'No description available.';
  }

}
