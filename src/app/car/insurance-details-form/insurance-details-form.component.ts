import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, map, tap } from 'rxjs';
import { CarsService } from '../cars.service';
import { Option } from 'src/app/shared/select/select.component';

@Component({
  selector: 'app-insurance-details-form',
  templateUrl: './insurance-details-form.component.html',
  styleUrls: ['./insurance-details-form.component.css'],
})
export class InsuranceDetailsFormComponent {
  @Input() insuranceDetails!: FormGroup;
  @Input() registrationType!: string;

  currentYear = new Date().getFullYear();
  today: Date = new Date();
  options = ['Yes', 'No'];

  ngOnInit() {
    this.insuranceDetails
      .get('existingExpiryDate')
      ?.valueChanges.pipe(
        filter((date) => Boolean(date)),
        map((date) => new Date(date || '')),
        map(
          (date) =>
            new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        ),
        tap((date) =>
          this.insuranceDetails.get('newStartDate')?.setValue(date, {
            emitModelToViewChange: true,
          })
        )
      )
      .subscribe();

    this.insuranceDetails
      .get('existingInsurance')
      ?.valueChanges.pipe(
        filter((val) => val === 'Yes'),
        tap(() => this.insuranceDetails.get('newStartDate')?.reset()),
        tap(() => this.insuranceDetails.get('existingExpiryDate')?.reset()),
        tap(() =>
          this.insuranceDetails
            .get('existingExpiryDate')
            ?.setValidators(Validators.required)
        ),
        tap(() =>
          this.insuranceDetails
            .get('existingExpiryDate')
            ?.updateValueAndValidity()
        ),
        tap(() => this.insuranceDetails.get('newStartDate')?.disable())
      )
      .subscribe();

    this.insuranceDetails
      .get('existingInsurance')
      ?.valueChanges.pipe(
        filter((val) => val === 'No'),
        tap(() =>
          this.insuranceDetails.get('existingExpiryDate')?.setValue('')
        ),
        tap(() => this.insuranceDetails.get('newStartDate')?.reset()),
        tap(() => this.insuranceDetails.get('newStartDate')?.enable()),
        tap(() =>
          this.insuranceDetails
            .get('existingExpiryDate')
            ?.removeValidators(Validators.required)
        ),
        tap(() =>
          this.insuranceDetails
            .get('existingExpiryDate')
            ?.updateValueAndValidity()
        )
      )
      .subscribe();
  }

  constructor(private carsService: CarsService) {}

  convertData(property: string, data: any[]): Option[] {
    return this.carsService.convertData(property, data);
  }

  getExpiryDate() {
    return this.insuranceDetails.controls['existingExpiryDate'].value;
  }

  convertToDate(dateString: string) {
    let date = new Date(dateString);
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    return newDate;
  }

  getControl(controlName: string) {
    return this.insuranceDetails.get(controlName) as FormControl;
  }

  get existingInsurance() {
    return this.insuranceDetails.controls['existingInsurance']?.value;
  }
}
