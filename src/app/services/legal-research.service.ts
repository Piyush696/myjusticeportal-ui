import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class LegalResearchService {
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

  postForm(formData) {
    return this.httpClient.post<object>(`${this.apiPath}/legalResearch`, formData, this.getHeaders());
  }

  ongetAllLegalForms() {
    return this.httpClient.get<object>(`${this.apiPath}/legalResearch`, this.getHeaders());
  }
  ongetSingleLegalForms(legalResearchId) {
    return this.httpClient.get<object>(`${this.apiPath}/legalResearch/` + legalResearchId, this.getHeaders());
  }

  updateForm(formData, legalResearchId) {
    return this.httpClient.put<object>(`${this.apiPath}/legalResearch/` + legalResearchId, formData, this.getHeaders());
  }

}
