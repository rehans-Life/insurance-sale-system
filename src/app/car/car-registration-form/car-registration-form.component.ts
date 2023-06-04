import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  CarOwnershipForm,
  CarRegistrationForm,
  CarRegistrationTypeForm,
} from '../interfaces';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-car-registration-form',
  templateUrl: './car-registration-form.component.html',
  styleUrls: ['./car-registration-form.component.css'],
})
export class CarRegistrationFormComponent {
  @Input() carRegistrationForm!: FormGroup<CarRegistrationForm>;

  get carRegistrationTypeForm(): FormGroup<CarRegistrationTypeForm> {
    return this.carRegistrationForm.controls.carRegistrationType;
  }

  get carOwnershipForm(): FormGroup<CarOwnershipForm> {
    return this.carRegistrationForm.controls.carOwnership;
  }

  ngOnInit() {
    this.carRegistrationTypeForm.valueChanges
      .pipe(
        filter(() => Boolean(this.carOwnershipForm.controls.carloan.value)),
        tap(() => this.carOwnershipForm.controls.carloan.setValue(''))
      )
      .subscribe(() => {});
  }
}
