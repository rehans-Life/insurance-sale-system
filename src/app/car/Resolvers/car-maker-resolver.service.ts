import { Injectable, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CarMaker, CarsService } from '../cars.service';

@Injectable({
  providedIn: 'root',
})
export class CarMakerResolverService {
  constructor() {}

  static resolve: ResolveFn<CarMaker[]> = () => {
    return inject(CarsService).getCarMakers();
  };
}
