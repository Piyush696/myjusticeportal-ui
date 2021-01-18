import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class InmateDefenderService {
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


  getPublicDefenders() {
    return this.httpClient.get<object>(`${this.apiPath}/inmatdefender`, this.getHeaders());
  }

  getCaseInmates(userId) {
    return this.httpClient.get<object>(`${this.apiPath}/inmatdefender/allCases/${userId}`, this.getHeaders());
  }

  getRegisteredFacilities() {
    return this.httpClient.get<object>(`${this.apiPath}/inmatdefender/allDefenderFacility`, this.getHeaders());
  }

  setPublicDefender(data) {
    return this.httpClient.post<object>(`${this.apiPath}/inmatdefender`,data, this.getHeaders());
  }

  getInmateCases() {
    return this.httpClient.get<object>(`${this.apiPath}/inmatdefender/allInmateAssignedCases`, this.getHeaders());
  }
}
