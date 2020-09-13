import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CacheService } from './cache.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HireLawyerService {
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

  getOrganization() {
    return this.httpClient.get<any>(`${this.apiPath}/hirealawyer/organizations`, this.getHeaders());
  }

  getUsersLawyer(organizationId) {
    return this.httpClient.get<any>(`${this.apiPath}/hirealawyer/organizations/${organizationId}`, this.getHeaders());
  }

  setCasesLawyer(selectedCases) {
    return this.httpClient.post<any>(`${this.apiPath}/hirealawyer`, { selectedCases }, this.getHeaders());
  }
}