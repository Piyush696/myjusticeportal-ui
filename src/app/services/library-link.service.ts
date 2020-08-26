import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibraryLinkService {
  private apiPath: string;

  constructor(private httpClient: HttpClient, private cacheService: CacheService) {
    const env: any = environment;
    this.apiPath = env.api
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.cacheService.getCache('token')}`
      })
    };
  }
  getAllLibraryLink() {
    return this.httpClient.get<object>(`${this.apiPath}/libraryLink`, this.getHeaders())
  }

  updateLibraryLink(data) {
    return this.httpClient.post<object>(`${this.apiPath}/libraryLink`, data, this.getHeaders())
  }

}
