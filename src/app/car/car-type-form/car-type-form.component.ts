import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarsService, Month, Year } from '../cars.service';
import { filter, tap } from 'rxjs';
import { CarRegistrationTypeForm } from '../interfaces';

@Component({
  selector: 'app-car-type-form',
  templateUrl: './car-type-form.component.html',
  styleUrls: ['./car-type-form.component.css'],
})
export class CarTypeFormComponent {
  @Input() carRegistrationTypeForm!: FormGroup<CarRegistrationTypeForm>;

  years: Year[] = [];
  months: Month[] = [];
  registrationTypes = ['Brand new', 'Registered'];

  constructor(private carsService: CarsService) {}

  showRegisteredDate() {
    return (
      this.years.length &&
      this.carRegistrationTypeForm.get('type')?.value === 'Registered'
    );
  }

  ngOnInit() {
    this.carsService.years.subscribe((years) => {
      this.years = years;
    });

    this.carsService.months.subscribe((months) => {
      this.months = months;
    });

    this.carRegistrationTypeForm
      .get('type')
      ?.valueChanges.pipe(
        tap(() =>
          this.carRegistrationTypeForm.get('yearOfRegistration')?.setValue('')
        ),
        filter(
          (registrationType) => registrationType === this.registrationTypes[1]
        ),
        filter(() => !this.years.length),
        tap(() => this.carsService.getYears())
      )
      .subscribe(() => {});

    this.carRegistrationTypeForm
      .get('yearOfRegistration')
      ?.valueChanges.pipe(
        tap(() =>
          this.carRegistrationTypeForm.get('monthOfRegistration')?.setValue('')
        ),
        filter((year) => year !== ''),
        filter(() => !this.months.length),
        tap(() => this.carsService.getMonths())
      )
      .subscribe(() => {});
  }
}
