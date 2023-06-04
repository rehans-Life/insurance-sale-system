import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent {
  @Input() label = '';
  @Input() value: Date | undefined;
  @Input() disabled = false;
  @Input() placeholder = '';
  @Input() control!: FormControl;
  @Input() minDate!: Date;
  @Input() maxDate!: Date;

  constructor() {}

  ngOnInit() {}
}
