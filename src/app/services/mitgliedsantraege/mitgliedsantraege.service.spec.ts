import { TestBed } from '@angular/core/testing';

import { MitgliedsantraegeService } from './mitgliedsantraege.service';

describe('MitgliedsantraegeService', () => {
  let service: MitgliedsantraegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MitgliedsantraegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
