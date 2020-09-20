import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CacheService } from './cache.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BondsmanService {
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

  getBondsmanOrganisation() {
    return this.httpClient.get<object>(`${this.apiPath}/bondsman`, this.getHeaders());
  }

  getBondsmanUser(organizationId) {
    return this.httpClient.get<object>(`${this.apiPath}/bondsman/${organizationId}`, this.getHeaders());
  }

}
