import { TestBed, inject } from '@angular/core/testing';

import { ContractForwarderService } from './contract-forwarder.service';

describe('ContractForwarderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractForwarderService]
    });
  });

  it('should be created', inject([ContractForwarderService], (service: ContractForwarderService) => {
    expect(service).toBeTruthy();
  }));
});
