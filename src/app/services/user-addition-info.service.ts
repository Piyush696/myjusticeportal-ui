import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class UserAdditionInfoService {
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

  getUsers() {
    return this.httpClient.get<object>(`${this.apiPath}/userAdditionalInfo`, this.getHeaders());
  }

  uploadFile(formData) {
    return this.httpClient.post<any>(`${this.apiPath}/userAdditionalInfo/uploadProfile`, formData, this.getHeaders());
  }

  updateAdditionalInfo(userData) {
    return this.httpClient.put<Object>(`${this.apiPath}/userAdditionalInfo`, userData, this.getHeaders());
  }
}
