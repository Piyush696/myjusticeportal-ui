import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiPath: string;
  private getAllUser: string;
  allUsers: string;

  constructor(private httpClient: HttpClient, private cacheService: CacheService) {
    const env: any = environment;
    this.apiPath = env.api
    this.getAllUser = 'user';
  }
  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.cacheService.getCache('token')}`
      })
    };
  }

  getUsers() {
    return this.httpClient.get<object>(`${this.apiPath}/${this.getAllUser}`, this.getHeaders())
  }

  getSingleUser(userId) {
    return this.httpClient.get<object>(`${this.apiPath}/${this.getAllUser}/${userId}`, this.getHeaders())
  }

  resetPassword(userId, password) {
    return this.httpClient.put<Object>(`${this.apiPath}/${this.getAllUser}/${userId}`, { password: password }, this.getHeaders());
  }
}
