import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CarValueControl } from '../formControls/car-value-control';
import { BehaviorSubject, filter, tap, switchMap } from 'rxjs';
import { DateofRegistration } from '../Validators/dateof-registration';
import { CarsService } from '../cars.service';
import { BankNameValidator } from '../Validators/bank-name-validator';
import { CprNoControl } from '../formControls/cpr-no-control';
import { CheckCPRValidator } from '../Validators/check-cprvalidator';
import {
  CarDetailsForm,
  CarInformationForm,
  CarOwnershipForm,
  CarRegistrationForm,
  CarRegistrationTypeForm,
  InsuranceDetails,
  InsuranceOwnerInformationForm,
} from '../interfaces';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css'],
})
export class CarFormComponent {
  showCarInformationForm = new BehaviorSubject(true);
  showCarRegistrationForm = new BehaviorSubject(true);
  showInsuranceDetailsForm = new BehaviorSubject(true);
  showInsuranceOwnerInformationForm = new BehaviorSubject(true);

  cardetailsForm = this.fb.group<CarDetailsForm>({
    carMake: new FormControl('', { validators: [Validators.required] }),
    carModel: new FormControl('', { validators: [Validators.required] }),
    modelYear: new FormControl('', { validators: [Validators.required] }),
    carValue: new CarValueControl('', {
      validators: [Validators.required],
    }),
  });

  carInformationForm = new FormGroup<CarInformationForm>({
    car_details: this.cardetailsForm,
    engine_size: this.fb.control<string | null>('', {
      validators: [Validators.required],
    }),
  });

  carRegistrationTypeForm = new FormGroup<CarRegistrationTypeForm>(
    {
      type: new FormControl('', { validators: [Validators.required] }),
      yearOfRegistration: new FormControl(''),
      monthOfRegistration: new FormControl(''),
    },
    {
      validators: [this.dateOfRegistration.validate],
    }
  );

  carOwnershipForm = new FormGroup<CarOwnershipForm>(
    {
      carloan: this.fb.control('', { validators: Validators.required }),
      bankName: this.fb.control(''),
    },
    {
      validators: [this.bankNameValidator.validate],
    }
  );

  carRegistrationForm = this.fb.group<CarRegistrationForm>({
    carRegistrationType: this.carRegistrationTypeForm,
    carOwnership: this.carOwnershipForm,
  });

  insuranceDetails = this.fb.group<InsuranceDetails>({
    existingInsurance: new FormControl('', {
      validators: [Validators.required],
    }),
    existingExpiryDate: new FormControl(''),
    newStartDate: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  insuranceOwnerInformationForm = this.fb.group<InsuranceOwnerInformationForm>({
    cprNo: new CprNoControl('', {
      validators: [Validators.required, Validators.minLength(9)],
      asyncValidators: [this.checkCPRValidator.validate],
    }),
    dob: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  completeInsuranceForm = new FormGroup({
    car_information: this.carInformationForm,
    car_registration_details: this.carRegistrationForm,
    insurance_details: this.insuranceDetails,
    insurance_owner_infromation: this.insuranceOwnerInformationForm,
  });

  constructor(
    private fb: FormBuilder,
    private dateOfRegistration: DateofRegistration,
    private bankNameValidator: BankNameValidator,
    public carsService: CarsService,
    private checkCPRValidator: CheckCPRValidator
  ) {
    this.carInformationForm.statusChanges
      .pipe(
        filter((status) => status === 'VALID'),
        tap(() => this.showCarInformationForm.next(false))
      )
      .subscribe();

    this.carInformationForm.valueChanges
      .pipe(
        filter(() => this.carRegistrationTypeForm.value.type !== ''),
        tap(() => this.carRegistrationForm.reset()),
        switchMap(() => this.showCarRegistrationForm),
        filter((show) => !show),
        tap(() => this.showCarRegistrationForm.next(true))
      )
      .subscribe();

    this.carRegistrationForm.valueChanges
      .pipe(
        filter(() => Boolean(this.insuranceDetails.value.existingInsurance)),
        tap(() => this.insuranceDetails.reset())
      )
      .subscribe(() => {});

    const carRegistrationValid = this.carRegistrationForm.statusChanges.pipe(
      filter((status) => status === 'VALID')
    );

    carRegistrationValid
      .pipe(tap(() => this.showCarRegistrationForm.next(false)))
      .subscribe();

    carRegistrationValid
      .pipe(
        filter(() => this.carRegistrationTypeForm.value.type === 'Registered'),
        tap(() => this.insuranceDetails.controls.existingInsurance.reset('')),
        tap(() => this.showInsuranceDetailsForm.next(true))
      )
      .subscribe();

    carRegistrationValid
      .pipe(
        filter(() => this.carRegistrationTypeForm.value.type === 'Brand new'),
        tap(() =>
          this.insuranceDetails.controls.existingInsurance.setValue('No')
        ),
        tap(() => this.showInsuranceDetailsForm.next(true))
      )
      .subscribe();

    this.insuranceDetails.statusChanges
      .pipe(
        filter((status) => status === 'VALID'),
        tap(() => this.showInsuranceDetailsForm.next(false))
      )
      .subscribe(() => {});

    this.insuranceDetails.valueChanges
      .pipe(
        filter(() =>
          Boolean(this.insuranceOwnerInformationForm.controls.cprNo.value)
        ),
        tap(() =>
          this.insuranceOwnerInformationForm.controls.cprNo.setValue('')
        ),
        tap(() =>
          this.insuranceOwnerInformationForm.controls.cprNo.markAsUntouched()
        ),
        tap(() =>
          this.insuranceOwnerInformationForm.controls.cprNo.markAsPristine()
        ),
        switchMap(() => this.showInsuranceOwnerInformationForm),
        filter((show) => !show),
        tap(() => this.showInsuranceOwnerInformationForm.next(true))
      )
      .subscribe();

    this.insuranceOwnerInformationForm.statusChanges
      .pipe(
        filter((status) => status === 'VALID'),
        tap(() => this.showInsuranceOwnerInformationForm.next(false))
      )
      .subscribe();
  }

  onSubmit() {
    console.log(this.completeInsuranceForm.value);
  }
}
