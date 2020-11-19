import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class DefenderService {
  private apiPath: string;
  private case: string;
  allUsers: string;

  constructor(private httpClient: HttpClient, private cacheService: CacheService) {
    const env: any = environment;
    this.apiPath = env.api
    this.case = 'case';
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.cacheService.getCache('token')}`
      })
    };
  }

  getInmateUser() {
    return this.httpClient.get<object>(`${this.apiPath}/defender`, this.getHeaders());
  }

}
