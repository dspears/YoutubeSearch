import { SampleApiData } from '../stubs/getSampleStats';

/**
 * Mock of the Google API for unit testing.
 */
export const gapiMock = {
  load(resource, cb) {
    cb();
  },
  client: {
    init() {
      return Promise.resolve();
    },
    request(apiParams) {
      console.log('gapiMock: returning mock data');
      const data = apiParams.path.includes('part=statistics') ?
        SampleApiData.getSampleSearch() :
        SampleApiData.getSampleStats();
      return Promise.resolve(data);
    }
  }
};
