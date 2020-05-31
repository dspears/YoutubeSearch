import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SearchControlComponent } from './components/search-control/search-control.component';
import { SearchResultsTableComponent } from './components/search-results-table/search-results-table.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    SearchControlComponent,
    SearchResultsTableComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
