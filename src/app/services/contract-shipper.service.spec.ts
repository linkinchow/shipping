import { TestBed, inject } from '@angular/core/testing';

import { ContractShipperService } from './contract-shipper.service';

describe('ContractShipperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractShipperService]
    });
  });

  it('should be created', inject([ContractShipperService], (service: ContractShipperService) => {
    expect(service).toBeTruthy();
  }));
});
