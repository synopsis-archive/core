import { TestBed } from '@angular/core/testing';

import { PluginListServiceService } from './plugin-list-service.service';

describe('PluginListServiceService', () => {
  let service: PluginListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PluginListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
