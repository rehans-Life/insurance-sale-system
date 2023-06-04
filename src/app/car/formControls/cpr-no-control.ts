import { FormControl } from '@angular/forms';

export class CprNoControl extends FormControl {
  override setValue(value: string, options: any) {
    const len = value.length;
    if (len <= 9) {
      super.setValue(value, {
        ...options,
        emitModelToViewChange: true,
      });
    } else {
      super.setValue(value.slice(0, len - 1), {
        ...options,
        emitModelToViewChange: true,
      });
    }
  }
}
