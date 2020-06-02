import { TestBed } from '@angular/core/testing';

import { YoutubeStatisticsService } from './youtube-statistics.service';

describe('YoutubeStatisticsService', () => {
  let service: YoutubeStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubeStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
