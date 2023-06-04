import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarDetailsForm, CarInformationForm } from '../interfaces';

@Component({
  selector: 'app-car-information-form',
  templateUrl: './car-information-form.component.html',
  styleUrls: ['./car-information-form.component.css'],
})
export class CarInformationFormComponent {
  @Input() carInformationForm!: FormGroup<CarInformationForm>;

  engine_sizes = [
    '1400 and less',
    '1401 - 2200',
    '2201 - 3650',
    '3651 and more',
  ];

  ngOnInit() {
    this.cardetailsForm?.valueChanges.subscribe(() => {
      this.engine_size.setValue('');
    });
  }

  get cardetailsForm(): FormGroup<CarDetailsForm> {
    return this.carInformationForm.controls.car_details;
  }

  get engine_size(): FormControl {
    return this.carInformationForm.controls.engine_size;
  }
}
