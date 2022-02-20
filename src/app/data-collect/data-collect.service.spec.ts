import { TestBed } from '@angular/core/testing';

import { DataCollectService } from './data-collect.service';

describe('DataCollectService', () => {
  let service: DataCollectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCollectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
