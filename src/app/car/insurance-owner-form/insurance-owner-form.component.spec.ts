import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceOwnerFormComponent } from './insurance-owner-form.component';

describe('InsuranceOwnerFormComponent', () => {
  let component: InsuranceOwnerFormComponent;
  let fixture: ComponentFixture<InsuranceOwnerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceOwnerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceOwnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
