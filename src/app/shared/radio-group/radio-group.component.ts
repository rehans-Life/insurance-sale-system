import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.css'],
})
export class RadioGroupComponent {
  @Input() label = '';
  @Input() options: string[] = [];
  @Input() control!: FormControl;
  @Input() name = '';

  ngOnChanges() {}
}
