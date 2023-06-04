import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRegistrationFormComponent } from './car-registration-form.component';

describe('CarRegistrationFormComponent', () => {
  let component: CarRegistrationFormComponent;
  let fixture: ComponentFixture<CarRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarRegistrationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
