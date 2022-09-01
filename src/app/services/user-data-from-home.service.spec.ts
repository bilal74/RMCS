import { TestBed } from '@angular/core/testing';

import { UserDataFromHomeService } from './user-data-from-home.service';

describe('UserDataFromHomeService', () => {
  let service: UserDataFromHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataFromHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
