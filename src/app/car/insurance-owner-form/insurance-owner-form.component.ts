import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InsuranceOwnerInformationForm } from '../interfaces';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-insurance-owner-form',
  templateUrl: './insurance-owner-form.component.html',
  styleUrls: ['./insurance-owner-form.component.css'],
})
export class InsuranceOwnerFormComponent {
  @Input() insuranceOwnerForm!: FormGroup<InsuranceOwnerInformationForm>;

  today = new Date();

  ngOnInit() {
    this.insuranceOwnerForm.controls.cprNo.valueChanges
      .pipe(
        filter(() => Boolean(this.insuranceOwnerForm.controls.dob.value)),
        tap(() => this.insuranceOwnerForm.controls.dob.setValue(null))
      )
      .subscribe();
  }

  getMaxDate() {
    const eitheenYears = new Date(
      this.today.getFullYear() - 18,
      this.today.getMonth(),
      this.today.getDate()
    );
    return eitheenYears;
  }
}
