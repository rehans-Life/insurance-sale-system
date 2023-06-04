import { Component, ElementRef, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  CarDetailsForm,
  CarInformationCollection,
  CarInformationForm,
  CarOwnershipForm,
  CarRegistrationCollection,
  CarRegistrationForm,
  CarRegistrationTypeForm,
  Collection,
  InsuranceDetails,
  InsuranceOwnerInformationCollection,
  InsuranceOwnerInformationForm,
  InsurancePlanCollection,
} from '../interfaces';
import { map } from 'rxjs';

@Component({
  selector: 'app-qoutation',
  templateUrl: './qoutation.component.html',
  styleUrls: ['./qoutation.component.css'],
})
export class QoutationComponent {
  @Input() carInformationForm!: FormGroup<CarInformationForm>;

  @Input() carRegistrationForm!: FormGroup<CarRegistrationForm>;
  @Input() insuranceDetails!: FormGroup<InsuranceDetails>;
  @Input()
  insuranceOwnerInformationForm!: FormGroup<InsuranceOwnerInformationForm>;

  lists!: Collection;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.firstChild.style.cssText = `
      height: 100%;
    `;

    this.carInformationForm.valueChanges.subscribe((newVal) => {
      this.lists['Car Information'] = {
        'Car Make': newVal.car_details?.carMake || '',
        'Car Model': newVal.car_details?.carModel || '',
        'Model Year': newVal.car_details?.modelYear || '',
        'Car Value': newVal.car_details?.carValue || '',
        'Engine size/CC': newVal.engine_size || '',
      };
    });

    this.carRegistrationForm.valueChanges.subscribe((newVal) => {
      this.lists['Car Registration'] = {
        'Car New': newVal.carRegistrationType?.type || '',
        'Year of 1st Registration':
          newVal.carRegistrationType?.yearOfRegistration || '',
        'Month of 1st Registration':
          newVal.carRegistrationType?.monthOfRegistration || '',
        'Car Loan/Installment': newVal.carOwnership?.carloan || '',
        'Bank/Lender Name': newVal.carOwnership?.bankName || '',
      };
    });

    this.insuranceDetails.valueChanges
      .pipe(map(() => this.insuranceDetails.getRawValue()))
      .subscribe((newVal) => {
        console.log(newVal);
        this.lists['Insurance Plan'] = {
          'Existing Insurance': newVal.existingInsurance || '',
          'Expiry date of Existing Insurance': newVal.existingExpiryDate || '',
          'Start date of New Instance': newVal.newStartDate || '',
        };
      });

    this.insuranceOwnerInformationForm.valueChanges.subscribe((newVal) => {
      this.lists['Insurance Owner Information'] = {
        'CPR Number': newVal.cprNo || '',
        'Date of Birth': newVal.dob || '',
      };
    });
  }

  ngOnChanges() {
    this.lists = {
      'Car Information': {
        'Car Make': this.carDetails.controls.carMake.value,
        'Car Model': this.carDetails.controls.carModel.value,
        'Model Year': this.carDetails.controls.modelYear.value,
        'Car Value': this.carDetails.controls.carValue.value,
        'Engine size/CC': this.carInformationForm.controls.engine_size.value,
      },
      'Car Registration': {
        'Car New': this.carRegistrationType.controls.type.value,
        'Year of 1st Registration':
          this.carRegistrationType.controls.yearOfRegistration.value,
        'Month of 1st Registration':
          this.carRegistrationType.controls.monthOfRegistration.value,
        'Car Loan/Installment': this.carOwnership.controls.bankName.value,
        'Bank/Lender Name': this.carOwnership.controls.bankName.value,
      },
      'Insurance Plan': {
        'Existing Insurance':
          this.insuranceDetails.controls.existingInsurance.value,
        'Expiry date of Existing Insurance':
          this.insuranceDetails.controls.existingExpiryDate.value,
        'Start date of New Instance':
          this.insuranceDetails.controls.newStartDate.value,
      },
      'Insurance Owner Information': {
        'CPR Number': this.insuranceOwnerInformationForm.controls.cprNo.value,
        'Date of Birth': this.insuranceOwnerInformationForm.controls.dob.value,
      },
    };
  }

  get carDetails() {
    return this.carInformationForm.controls
      .car_details as FormGroup<CarDetailsForm>;
  }

  get carRegistrationType() {
    return this.carRegistrationForm.controls
      .carRegistrationType as FormGroup<CarRegistrationTypeForm>;
  }

  get carOwnership() {
    return this.carRegistrationForm.controls
      .carOwnership as FormGroup<CarOwnershipForm>;
  }

  get Collections() {
    return Object.entries(this.lists);
  }

  convert(
    obj:
      | CarInformationCollection
      | CarRegistrationCollection
      | InsurancePlanCollection
      | InsuranceOwnerInformationCollection
  ) {
    return Object.entries(obj);
  }
}
