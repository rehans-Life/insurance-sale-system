import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BankNameValidator {
  validate: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const { carloan, bankName } = group.value;

    if (carloan === 'No') {
      return null;
    }

    if (!bankName) {
      return { bankNameRequired: true };
    }

    return null;
  };
}
