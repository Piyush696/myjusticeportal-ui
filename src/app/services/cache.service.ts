import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
  private userDetails: any;
  public organizationDetail: any;

  constructor() { }

  setCache(name, val) {
    localStorage.setItem('myjustice-' + name, JSON.stringify(val));
  }

  getCache(name) {
    const cache = localStorage.getItem('myjustice-' + name);
    return cache ? JSON.parse(cache) : 'null';
  }

  removeCache(name) {
    localStorage.removeItem('myjustice-' + name);
  }

  setUserDetails(val) {
    this.userDetails = val;
  }

  getUserDetails() {
    return this.userDetails;
  }

}
