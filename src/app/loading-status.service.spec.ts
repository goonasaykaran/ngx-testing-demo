/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoadingStatusService } from './loading-status.service';

describe('LoadingStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingStatusService]
    });
  });

  it('should ...', inject([LoadingStatusService], (service: LoadingStatusService) => {
    expect(service).toBeTruthy();
  }));
});
