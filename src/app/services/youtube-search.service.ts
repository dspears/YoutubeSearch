import { Injectable, setTestabilityGetter } from '@angular/core';
import { GoogleApiService } from './google-api.service';
import { YoutubeStatisticsService } from './youtube-statistics.service';

@Injectable({
  providedIn: 'root'
})
export class YoutubeSearchService {

  baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video';
  pageSize = 25;
  nextPageToken = '';
  prevPageToken = '';
  totalResults = 0;
  currentSearchUrl = '';
  etag = '';
  loading = false;
  errorMsg = '';

  constructor(private readonly googleApi: GoogleApiService, private readonly youtubeStatistics: YoutubeStatisticsService) {}

  async searchKeywords(keywords: string, order: string = 'relevance') {
    order = order || 'relevance';
    const url = `${this.baseUrl}&maxResults=${this.pageSize}&q=${keywords}&order=${order}`;
    if (url !== this.currentSearchUrl) {
      this.reset();
      this.currentSearchUrl = url;
    }
    return await this.callApi(url);
  }

  numPages() {
    return Math.ceil(this.totalResults / this.pageSize);
  }

  async nextPage() {
    if (this.nextPageToken !== '') {
      const url = this.currentSearchUrl + `&pageToken=${this.nextPageToken}`;
      return await this.callApi(url);
    } else {
      return [];
    }
  }

  async prevPage() {
    if (this.prevPageToken !== '') {
      const url = this.currentSearchUrl + `&pageToken=${this.prevPageToken}`;
      return await this.callApi(url);
    } else {
      return [];
    }
  }

  isLoading(): boolean {
    return this.loading;
  }

  getError(): string {
    return this.errorMsg;
  }

  hasNextPage(): boolean {
    return !!this.nextPageToken;
  }

  hasPrevPage(): boolean {
    return !!this.prevPageToken;
  }

  private async callApi(url) {
    let response;
    this.loading = true;
    try {
      response = await this.googleApi.request(url);
      response.result.items = await this.youtubeStatistics.collectStatistics(response.result.items);
      this.savePagingInfo(response.result);
    } catch (e) {
      this.setErrorState('YouTube API Currently Unavailable.  Try Again Later.');
      response = { result: { items: [] }};
    }
    this.loading = false;
    return response.result.items;
  }

  private reset() {
    this.nextPageToken = '';
    this.prevPageToken = '';
    this.totalResults = 0;
    this.setErrorState('');
  }

  private setErrorState(msg) {
    this.errorMsg = msg;
  }

  private savePagingInfo(result) {
    this.nextPageToken = result.nextPageToken || '';
    this.prevPageToken = result.prevPageToken || '';
    this.totalResults = parseInt(result.pageInfo?.resultsPerPage, 10);
    this.etag = result.etag || '';
  }
}
