import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CarModule } from '../car/car.module';

@NgModule({
  declarations: [FormLayoutComponent],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    CarModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class LayoutsModule {}
