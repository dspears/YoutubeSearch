import { TestBed } from '@angular/core/testing';
import { GoogleApiService } from './google-api.service';
import { gapiMock } from '../../test/mocks/gapiMock';

// Setup Mock Google API that retrieves stubbed data fixture
declare let window: any;
window.gapi = gapiMock;
window.__env = {};
window.__env['apiKey'] = 'test_api_key';

describe('GoogleApiService', () => {
  let service: GoogleApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize to state init', () => {
    expect(service.state).toEqual('init');
  });

  it('should return search data', async () => {
    const data = await service.request('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=cat');
    expect(data.items.length).toEqual(25);
  });

  it('should return stats data', async () => {
    const data = await service.request('https://www.googleapis.com/youtube/v3/videos?part=statistics');
    expect(data.items.length).toEqual(25);
  });

});
