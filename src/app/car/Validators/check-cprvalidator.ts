import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { CarsService } from '../cars.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckCPRValidator {
  constructor(private carsService: CarsService) {}

  validate: AsyncValidatorFn = (control: AbstractControl) => {
    return this.carsService.checkCPRNo(control.value);
  };
}
