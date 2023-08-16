import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noDescription'
})
export class NoDescriptionPipe implements PipeTransform {

  transform(value: string): string {
    return value.length > 0 ? value : 'No description available.';
  }

}
