import { FormControl } from '@angular/forms';

export class CarValueControl extends FormControl {
  override setValue(value: string | null, options: any) {
    const val = parseInt(value || '');
    if (typeof val === 'number' && val >= 0) {
      if (value !== null && value.length <= 6) {
        super.setValue(value, {
          ...options,
          emitModelToViewChange: true,
        });
      } else {
        super.setValue(value?.slice(0, value.length - 1), {
          ...options,
          emitModelToViewChange: true,
        });
      }
    } else {
      super.setValue(null, {
        ...options,
        emitModelToViewChange: true,
      });
    }
    return;
  }
}
