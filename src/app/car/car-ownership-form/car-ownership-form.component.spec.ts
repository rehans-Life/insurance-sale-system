import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOwnershipFormComponent } from './car-ownership-form.component';

describe('CarOwnershipFormComponent', () => {
  let component: CarOwnershipFormComponent;
  let fixture: ComponentFixture<CarOwnershipFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarOwnershipFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOwnershipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
