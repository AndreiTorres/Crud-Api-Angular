import { TestBed } from '@angular/core/testing';

import { ApilibrosService } from './apilibros.service';

describe('ApilibrosService', () => {
  let service: ApilibrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApilibrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
