import { TestBed } from '@angular/core/testing';

import { CarMakerResolverService } from './car-maker-resolver.service';

describe('CarMakerResolverService', () => {
  let service: CarMakerResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarMakerResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
