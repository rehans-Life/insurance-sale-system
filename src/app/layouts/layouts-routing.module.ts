import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { CarFormComponent } from '../car/car-form/car-form.component';
import { CarMakerResolverService } from '../car/Resolvers/car-maker-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: FormLayoutComponent,
    children: [
      {
        path: 'get-a-qoute',
        component: CarFormComponent,
        resolve: {
          carMakers: CarMakerResolverService.resolve,
        },
      },
      {
        path: 'review-and-buy',
        loadChildren: () =>
          import('../review-and-buy/review-and-buy.module').then(
            (module) => module.ReviewAndBuyModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutsRoutingModule {}
