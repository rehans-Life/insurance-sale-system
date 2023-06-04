import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInformationFormComponent } from './car-information-form.component';

describe('CarInformationFormComponent', () => {
  let component: CarInformationFormComponent;
  let fixture: ComponentFixture<CarInformationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarInformationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
