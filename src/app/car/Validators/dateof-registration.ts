import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DateofRegistration {
  validate: ValidatorFn = (
    group: AbstractControl<any, any>
  ): ValidationErrors | null => {
    const { type, yearOfRegistration, monthOfRegistration } = group.value;

    if (type === 'Brand new') {
      return null;
    }

    if (!yearOfRegistration || !monthOfRegistration) {
      return {
        dateOfRegistrationRequired: true,
      };
    }

    return null;
  };
}
