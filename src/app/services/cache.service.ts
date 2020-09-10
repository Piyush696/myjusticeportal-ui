import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
  private userDetails: any;
  public organizationDetail: any;

  constructor() { }

  setCache(name, val) {
    var days = new Date();
    days.setTime(days.getTime() + (1 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + days.toUTCString();
    document.cookie = 'myjustice-' + name + "=" + JSON.stringify(val) + ";" + expires + ";path=/";
  }

  getCache(name) {
    let cookieName = 'myjustice-' + name + "=";
    let splitedCookies = document.cookie.split(';');
    for (let i = 0; i < splitedCookies.length; i++) {
      let singleCookie = splitedCookies[i];
      while (singleCookie.charAt(0) == ' ') {
        singleCookie = singleCookie.substring(1, singleCookie.length);
      }
      if (singleCookie.indexOf(cookieName) == 0) {
        return JSON.parse(singleCookie.substring(cookieName.length, singleCookie.length));
      }
    }
    return null;
  }

  removeCache(name) {
    document.cookie = 'myjustice-' + name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  setUserDetails(val) {
    this.userDetails = val;
  }

  getUserDetails() {
    return this.userDetails;
  }
}