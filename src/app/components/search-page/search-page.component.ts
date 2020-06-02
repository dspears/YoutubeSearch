import { Component } from '@angular/core';
import { YoutubeSearchService } from 'src/app/services/youtube-search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
  searchResults = [];

  constructor(readonly youtubeSearch: YoutubeSearchService) { }

  isTableVisible(): boolean {
    return !this.youtubeSearch.isLoading() && this.searchResults.length > 0;
  }

  isLandingMessageVisible(): boolean {
    return !this.youtubeSearch.isLoading() && !(this.searchResults.length > 0);
  }

  async doSearch(evt) {
    this.searchResults = await this.youtubeSearch.searchKeywords(evt.keywords, evt.sortBy);
  }

  async nextPage() {
    this.searchResults = await this.youtubeSearch.nextPage();
  }

  async prevPage() {
    this.searchResults = await this.youtubeSearch.prevPage();
  }

}
