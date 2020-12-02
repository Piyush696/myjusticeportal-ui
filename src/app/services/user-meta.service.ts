import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserMetaService {

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

  createUserMeta(userMetaData) {
    return this.httpClient.post<object>(`${this.apiPath}/userMeta/createUserMetaList`, userMetaData)
  }

  updateUserMeta(userMetaData) {
    return this.httpClient.put<object>(`${this.apiPath}/userMeta/update`, userMetaData, this.getHeaders())
  }

  getUserBillingDetails() {
    return this.httpClient.get<object>(`${this.apiPath}/userMeta/user/userMeta`, this.getHeaders())
  }

  getUserAdditionalDetails() {
    return this.httpClient.get<object>(`${this.apiPath}/userMeta`, this.getHeaders())
  }
}
