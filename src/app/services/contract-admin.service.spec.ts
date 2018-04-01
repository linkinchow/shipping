import { TestBed, inject } from '@angular/core/testing';

import { ContractAdminService } from './contract-admin.service';

describe('ContractAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractAdminService]
    });
  });

  it('should be created', inject([ContractAdminService], (service: ContractAdminService) => {
    expect(service).toBeTruthy();
  }));
});
