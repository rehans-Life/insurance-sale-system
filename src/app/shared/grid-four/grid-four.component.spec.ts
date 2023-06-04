import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridFourComponent } from './grid-four.component';

describe('GridFourComponent', () => {
  let component: GridFourComponent;
  let fixture: ComponentFixture<GridFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridFourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
