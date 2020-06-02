import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-control',
  templateUrl: './search-control.component.html',
  styleUrls: ['./search-control.component.scss']
})
export class SearchControlComponent {

  @Output() doSearch = new EventEmitter<any>();
  sortBy = '';

  onSearch(keywords) {
    keywords = keywords.trim();
    if (keywords) {
      this.doSearch.emit({keywords, sortBy: this.sortBy});
    }
  }
}
