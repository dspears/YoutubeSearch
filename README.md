# Youtubesearch App

## NOTE on API Key

To run this app you must edit the src/env.js file and paste in a valid API Key.

The API Key must be authorized to access the YouTube Data API (see Google API Console).

## Creating the Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

Added material:

- npx ng add @angular/material

Generated boilerplate components and services:

- npx ng generate component components/search-page
- npx ng generate component components/search-control
- npx ng generate component components/search-results-table
- npx ng generate service services/google-api
- npx ng generate service services/youtube-search
- npx ng generate service services/youtube-statistics

## Design Notes:

I implemented three services:

- GoogleApi:  responsible for interfacing to YouTube Data API via Google's gapi.
- YoutubeSearch:  performs keyword searches in sort order.
- YoutubeStatistics:  collects stats on a set of videos.

I chose to have YoutubeSearch depend on YoutubeStatistics so that results from the
search api have the stats baked in.  Alternatively this dependency could have been
removed and the SearchPageComponent could have called the YoutubeStatistics service
to get the stats.

I also implemented three UI components:

- SearchPage:  Controls page layout and overall rendering, and calls the YoutubeSearch service API.
- SearchControl:  Renders the search form and emits an onSearch event to kick off a search.
- SearchResultsTable:  Render the table of results.

An improvement might be to move the "Next Page" "Prev Page" button controls currently in
SearchPage into a separate component, or possibly use the Material Design paging control. 

