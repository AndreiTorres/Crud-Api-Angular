import { TestBed } from '@angular/core/testing';

import { ApiusuariosService } from './apiusuarios.service';

describe('ApiusuariosService', () => {
  let service: ApiusuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiusuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
