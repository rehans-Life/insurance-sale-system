import { Component, Input } from '@angular/core';
import { CarMaker, CarModel, CarsService, ModelYear } from '../cars.service';
import { FormGroup, FormControl } from '@angular/forms';
import { filter, map, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent {
  @Input() cardetailsForm!: FormGroup;

  carMakers: CarMaker[] = [];
  carModels: CarModel[] = [];
  modelYears: ModelYear[] = [];

  constructor(
    private carsService: CarsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const { carMake, carModel, modelYear, carValue } =
      this.cardetailsForm.controls;

    this.route.data.subscribe(({ carMakers }) => {
      this.carMakers = carMakers;
    });

    this.carsService.carModels.subscribe((carModels) => {
      this.carModels = carModels;
    });

    this.carsService.modelYears.subscribe((modelYears) => {
      this.modelYears = modelYears;
    });

    carMake.valueChanges
      .pipe(
        tap((name) => this.carsService.getCarModels(name || '')),
        filter(() => Boolean(carModel)),
        tap(() => carModel.setValue(''))
      )
      .subscribe(() => {});

    carModel.valueChanges
      .pipe(
        tap(() => modelYear.setValue('')),
        filter((carModel) => carModel !== ''),
        tap((model) => this.carsService.getModelYear(model || ''))
      )
      .subscribe(() => {});

    modelYear.valueChanges
      .pipe(map(() => carValue.reset('')))
      .subscribe(() => {});
  }

  onChange(formControlName: string, { label }: { id: number; label: string }) {
    this.cardetailsForm.get(formControlName)?.setValue(label);
  }
}
