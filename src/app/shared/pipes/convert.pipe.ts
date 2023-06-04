import { Pipe, PipeTransform } from '@angular/core';
import { Option } from '../select/select.component';

@Pipe({
  name: 'convert',
})
export class ConvertPipe implements PipeTransform {
  transform(data: any[], property: string): Option[] {
    return data.map((option: any) => ({
      id: option.id,
      label: option[property],
    }));
  }
}
