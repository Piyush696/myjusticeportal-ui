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
    }
  }

  getLawyers() {
    return this.httpClient.get<object>(`${this.apiPath}/hirealawyer/users`, this.getHeaders());
  }

  getRequestedCases() {
    return this.httpClient.get<object>(`${this.apiPath}/hirealawyer/requested-cases`, this.getHeaders());
  }

  getRequestedCaseById(caseId) {
    return this.httpClient.get<object>(`${this.apiPath}/hirealawyer/requested-cases/` + caseId, this.getHeaders());
  }

  getDownloadLink(data) {
    return this.httpClient.post<any>(`${this.apiPath}/hirealawyer/fileDownloadLink`, data, this.getHeaders());
  }
}