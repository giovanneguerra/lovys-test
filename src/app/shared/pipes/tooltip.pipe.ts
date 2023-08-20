import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tooltip',
  standalone: true,
})
export class TooltipPipe implements PipeTransform {
  transform(title: string): string | undefined {
    return title.length > 16 ? title : undefined;
  }
}
