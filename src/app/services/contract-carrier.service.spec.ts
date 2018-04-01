import { TestBed, inject } from '@angular/core/testing';

import { ContractCarrierService } from './contract-carrier.service';

describe('ContractCarrierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractCarrierService]
    });
  });

  it('should be created', inject([ContractCarrierService], (service: ContractCarrierService) => {
    expect(service).toBeTruthy();
  }));
});
