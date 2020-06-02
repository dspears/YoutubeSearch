import { Injectable } from '@angular/core';
declare const gapi: any;
declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {
  state: string;
  // Get the API Key from env.js
  apiKey = window.__env.apiKey;

  constructor() {
    this.state = 'init';
    this.loadDone = this.loadDone.bind(this);
    this.initDone = this.initDone.bind(this);
    gapi.load('client', this.loadDone);
  }

  loadDone() {
    gapi.client.init({apiKey: this.apiKey})
    .then(_ => this.initDone());
  }

  initDone() {
    this.state = 'available';
  }

  async request(path: string) {
    return gapi.client.request({path});
  }
}
