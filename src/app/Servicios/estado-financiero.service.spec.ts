import { TestBed, inject } from '@angular/core/testing';

import { EstadoFinancieroService } from './estado-financiero.service';

describe('EstadoFinancieroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstadoFinancieroService]
    });
  });

  it('should be created', inject([EstadoFinancieroService], (service: EstadoFinancieroService) => {
    expect(service).toBeTruthy();
  }));
});
