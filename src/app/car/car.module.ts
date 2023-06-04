import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRoutingModule } from './car-routing.module';
import { CarFormComponent } from './car-form/car-form.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CarTypeFormComponent } from './car-type-form/car-type-form.component';
import { InsuranceDetailsFormComponent } from './insurance-details-form/insurance-details-form.component';
import { QoutationComponent } from './qoutation/qoutation.component';
import { InsuranceOwnerFormComponent } from './insurance-owner-form/insurance-owner-form.component';
import { CarOwnershipFormComponent } from './car-ownership-form/car-ownership-form.component';
import { CarRegistrationFormComponent } from './car-registration-form/car-registration-form.component';
import { CarInformationFormComponent } from './car-information-form/car-information-form.component';

@NgModule({
  declarations: [
    CarFormComponent,
    CarDetailsComponent,
    CarTypeFormComponent,
    InsuranceDetailsFormComponent,
    QoutationComponent,
    InsuranceOwnerFormComponent,
    CarOwnershipFormComponent,
    CarRegistrationFormComponent,
    CarInformationFormComponent,
  ],
  imports: [
    CommonModule,
    CarRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  exports: [CarFormComponent],
})
export class CarModule {}
