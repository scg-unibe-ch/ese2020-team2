import { TestBed } from '@angular/core/testing';

import { SoldService } from './sold.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SoldService', () => {
  let service: SoldService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    spyOn(window.localStorage, 'getItem').and.callFake(function() {
      return JSON.stringify({"user":"userId: 1"});
    });
    service = TestBed.inject(SoldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
