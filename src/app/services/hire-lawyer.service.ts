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

  getLawyers() {
    return this.httpClient.get<any>(`${this.apiPath}/hirealawyer/users`, this.getHeaders());
  }

  getUsersLawyer(organizationId) {
    return this.httpClient.get<any>(`${this.apiPath}/hirealawyer/users/${organizationId}`, this.getHeaders());
  }

  setCasesLawyer(caseIds) {
    return this.httpClient.post<any>(`${this.apiPath}/hirealawyer`, { caseIds }, this.getHeaders());
  }
}