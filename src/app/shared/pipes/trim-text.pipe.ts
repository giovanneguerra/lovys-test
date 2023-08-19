import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'trimText',
    standalone: true
})
export class TrimTextPipe implements PipeTransform {

  transform(value: string, maxLength: number ): string {
    return value.length <= maxLength ? value : value.substring(0, maxLength) + '...';
  }

}
