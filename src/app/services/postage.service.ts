import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class PostageService {
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

  getCredentials() {
    return this.httpClient.get<object>(`${this.apiPath}/postage`, this.getHeaders())
  }

  updateCredentials(updateCredencialData) {
    return this.httpClient.post<object>(`${this.apiPath}/postage`, updateCredencialData, this.getHeaders())
  }
}
