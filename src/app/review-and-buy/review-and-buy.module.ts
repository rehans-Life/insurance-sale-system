import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewAndBuyRoutingModule } from './review-and-buy-routing.module';
import { BuyFormComponent } from './buy-form/buy-form.component';


@NgModule({
  declarations: [
    BuyFormComponent
  ],
  imports: [
    CommonModule,
    ReviewAndBuyRoutingModule
  ]
})
export class ReviewAndBuyModule { }
