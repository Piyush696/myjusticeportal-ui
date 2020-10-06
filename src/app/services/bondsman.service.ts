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

  contactBondsman(data) {
    return this.httpClient.post<object>(`${this.apiPath}/bondsmanUser`, data, this.getHeaders());
  }

  getRequestedUser(status) {
    return this.httpClient.post<object>(`${this.apiPath}/bondsmanUser/requested-users`, status, this.getHeaders());
  }

  approveUser(bondsman_userId) {
    return this.httpClient.put<any>(`${this.apiPath}/bondsmanUser/approve-user/${bondsman_userId}`, this.getHeaders());
  }

  rejectUser(bondsman_userId) {
    return this.httpClient.put<any>(`${this.apiPath}/bondsmanUser/reject-user/` + bondsman_userId, this.getHeaders());
  }
}
