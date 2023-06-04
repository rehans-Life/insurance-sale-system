import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormValidCardComponent } from './form-valid-card.component';

describe('FormValidCardComponent', () => {
  let component: FormValidCardComponent;
  let fixture: ComponentFixture<FormValidCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormValidCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormValidCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
