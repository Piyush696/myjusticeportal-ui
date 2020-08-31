import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {
  private apiPath: string;
  private createUser: string;
  allUsers: string;

  constructor(private httpClient: HttpClient, private cacheService: CacheService) {
    const env: any = environment;
    this.apiPath = env.api
    this.createUser = 'user/registration';
  }


  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.cacheService.getCache('token')}`
      })
    };
  }

  addUser(profileData) {
    return this.httpClient.post<object>(`${this.apiPath}/${this.createUser}`, profileData)
  }

  checkUser(query = {}) {
    return this.httpClient.get<Object>(`${this.apiPath}/users`, { params: query });
  }

  checkFacilityCode(query = {}) {
    return this.httpClient.get<Object>(`${this.apiPath}/users/facilityCode/check`, { params: query });
  }

  updateUser(value) {
    return this.httpClient.put<object>(`${this.apiPath}/user`, { value })
  }

}
