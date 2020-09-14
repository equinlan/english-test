import { TestBed } from '@angular/core/testing';

import { TestNodesService } from './test-nodes.service';

describe('TestNodesService', () => {
  let service: TestNodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestNodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
