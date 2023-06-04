import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CarOwnershipForm } from '../interfaces';
import { Bank, CarsService } from '../cars.service';
import { tap, filter } from 'rxjs';

@Component({
  selector: 'app-car-ownership-form',
  templateUrl: './car-ownership-form.component.html',
  styleUrls: ['./car-ownership-form.component.css'],
})
export class CarOwnershipFormComponent {
  @Input() carOwnershipForm!: FormGroup<CarOwnershipForm>;
  banks: Bank[] = [];

  constructor(private carsService: CarsService) {}

  ngOnInit() {
    this.carsService.banks.subscribe((banks) => {
      this.banks = banks;
    });

    this.carOwnershipForm.controls.carloan.valueChanges
      .pipe(
        tap(() => this.carOwnershipForm.controls.bankName.setValue('')),
        filter((value) => value === 'Yes'),
        filter(() => !this.banks.length),
        tap(() => this.carsService.getBanks())
      )
      .subscribe(() => {});
  }

  showBankSelect() {
    return (
      this.carOwnershipForm.controls.carloan?.value === 'Yes' &&
      this.banks.length
    );
  }
}
