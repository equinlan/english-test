import { TestBed } from '@angular/core/testing';

import { WieItemsService } from './wie-items.service';

describe('WieItemsService', () => {
  let service: WieItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WieItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
