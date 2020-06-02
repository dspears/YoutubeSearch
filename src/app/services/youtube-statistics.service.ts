import { Injectable } from '@angular/core';
import { GoogleApiService } from './google-api.service';

@Injectable({
  providedIn: 'root'
})
export class YoutubeStatisticsService {
  baseUrl = 'https://www.googleapis.com/youtube/v3/videos?part=statistics';
  statsMap: Map<string, any>;

  constructor(private readonly googleApi: GoogleApiService) { }

  async collectStatistics(videoItems) {
    const idList = videoItems.map(v => v.id.videoId).join(',');
    const url = `${this.baseUrl}&id=${idList}`;
    const response = await this.googleApi.request(url);
    this.buildMap(response.result.items);
    return videoItems.map(v => {
       v.statistics = this.statsMap.get(v.id.videoId);
       return v;
    });
  }

  private buildMap(items) {
    this.statsMap = new Map();
    items.forEach(v => this.statsMap.set(v.id, this.toIntegers(v.statistics)));
  }

  private toIntegers(stats) {
    Object.keys(stats).forEach(k => stats[k] = parseInt(stats[k], 10));
    // Ensure that we always have a commentCount even if it's zero (e.g. for cases where comments are turned off)
    stats.commentCount = stats.commentCount || 0;
    return stats;
  }

}
