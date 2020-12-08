import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private apiPath: string;
  constructor(private httpClient: HttpClient, private cacheService: CacheService,private stripe:StripeService) {
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

  getStripeCredentials() {
    return this.httpClient.get<object>(`${this.apiPath}/stripeConnection`, this.getHeaders())
  }

  updateStripeCredentials(updateStripeCredencialData) {
    return this.httpClient.post<object>(`${this.apiPath}/stripeConnection`, updateStripeCredencialData, this.getHeaders())
  }

}
