import { FormControl, FormGroup } from '@angular/forms';

export interface CarDetailsForm {
  carMake: FormControl<string | null>;
  carModel: FormControl<string | null>;
  modelYear: FormControl<string | null>;
  carValue: FormControl<string | null>;
}

export interface CarInformationForm {
  car_details: FormGroup<CarDetailsForm>;
  engine_size: FormControl<string | null>;
}

export interface CarRegistrationTypeForm {
  type: FormControl<string | null>;
  yearOfRegistration: FormControl<string | null>;
  monthOfRegistration: FormControl<string | null>;
}

export interface CarOwnershipForm {
  carloan: FormControl<string | null>;
  bankName: FormControl<string | null>;
}

export interface CarRegistrationForm {
  carRegistrationType: FormGroup<CarRegistrationTypeForm>;
  carOwnership: FormGroup<CarOwnershipForm>;
}

export interface InsuranceDetails {
  existingInsurance: FormControl<string | null>;
  existingExpiryDate: FormControl<string | null>;
  newStartDate: FormControl<string | null>;
}

export interface InsuranceOwnerInformationForm {
  cprNo: FormControl<string | null>;
  dob: FormControl<string | null>;
}

export interface CarInformationCollection {
  'Car Make': string | null;
  'Car Model': string | null;
  'Model Year': string | null;
  'Car Value': string | null;
  'Engine size/CC': string | null;
}

export interface CarRegistrationCollection {
  'Car New': string | null;
  'Year of 1st Registration': string | null;
  'Month of 1st Registration': string | null;
  'Car Loan/Installment': string | null;
  'Bank/Lender Name': string | null;
}

export interface InsurancePlanCollection {
  'Existing Insurance': string | null;
  'Expiry date of Existing Insurance': string | null;
  'Start date of New Instance': string | null;
}

export interface InsuranceOwnerInformationCollection {
  'CPR Number': string | null;
  'Date of Birth': string | null;
}

export interface Collection {
  'Car Information': CarInformationCollection;
  'Car Registration': CarRegistrationCollection;
  'Insurance Plan': InsurancePlanCollection;
  'Insurance Owner Information': InsuranceOwnerInformationCollection;
}
