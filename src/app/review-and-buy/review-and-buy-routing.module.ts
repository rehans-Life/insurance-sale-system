import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyFormComponent } from './buy-form/buy-form.component';

const routes: Routes = [{ path: '', component: BuyFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewAndBuyRoutingModule {}
