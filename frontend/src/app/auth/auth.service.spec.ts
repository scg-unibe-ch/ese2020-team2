import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClientModule} from "@angular/common/http";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AuthService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
