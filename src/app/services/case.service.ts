import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';
@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private apiPath: string;
  private createCase: string;
  allUsers: string;
  constructor(private httpClient: HttpClient, private cacheService: CacheService) {
    const env: any = environment;
    this.apiPath = env.api
    this.createCase = 'case';
  }
  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.cacheService.getCache('token')}`
      })
    };
  }

  postCase(caseData) {
    return this.httpClient.post<object>(`${this.apiPath}/${this.createCase}`, caseData, this.getHeaders())
  }
}
