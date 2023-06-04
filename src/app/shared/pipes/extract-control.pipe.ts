import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'extractControl',
})
export class ExtractControlPipe implements PipeTransform {
  transform(group: FormGroup, field: string) {
    return group.controls[field] as FormControl;
  }
}
