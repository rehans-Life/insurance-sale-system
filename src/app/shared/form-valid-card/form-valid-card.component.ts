import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form-valid-card',
  templateUrl: './form-valid-card.component.html',
  styleUrls: ['./form-valid-card.component.css'],
})
export class FormValidCardComponent {
  @Output() edit = new EventEmitter();

  onClick() {
    this.edit.emit();
  }
}
