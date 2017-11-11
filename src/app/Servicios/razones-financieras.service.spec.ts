import { TestBed, inject } from '@angular/core/testing';

import { RazonesFinancierasService } from './razones-financieras.service';

describe('RazonesFinancierasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RazonesFinancierasService]
    });
  });

  it('should be created', inject([RazonesFinancierasService], (service: RazonesFinancierasService) => {
    expect(service).toBeTruthy();
  }));
});
