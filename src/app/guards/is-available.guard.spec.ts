import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isAvailableGuard } from './is-available.guard';

describe('isAvailableGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isAvailableGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
