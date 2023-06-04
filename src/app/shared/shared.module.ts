import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { FormCardComponent } from './form-card/form-card.component';
import { HeadingComponent } from './heading/heading.component';
import { RadioComponent } from './radio/radio.component';
import { GridFourComponent } from './grid-four/grid-four.component';
import { RadioGroupComponent } from './radio-group/radio-group.component';
import { FormValidCardComponent } from './form-valid-card/form-valid-card.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConvertPipe } from './pipes/convert.pipe';
import { ExtractControlPipe } from './pipes/extract-control.pipe';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    SelectComponent,
    InputComponent,
    FormCardComponent,
    HeadingComponent,
    RadioComponent,
    GridFourComponent,
    RadioGroupComponent,
    FormValidCardComponent,
    DatePickerComponent,
    ConvertPipe,
    ExtractControlPipe,
    DropdownDirective,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    SelectComponent,
    InputComponent,
    FormCardComponent,
    HeadingComponent,
    RadioComponent,
    GridFourComponent,
    RadioGroupComponent,
    FormValidCardComponent,
    DatePickerComponent,
    ConvertPipe,
    ExtractControlPipe,
  ],
})
export class SharedModule {}
