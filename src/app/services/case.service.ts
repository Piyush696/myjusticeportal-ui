import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';
@Injectable({
  providedIn: 'root'
})

export class CaseService {
  private apiPath: string;
  private case: string;
  allUsers: string;

  constructor(private httpClient: HttpClient, private cacheService: CacheService) {
    const env: any = environment;
    this.apiPath = env.api
    this.case = 'case';
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.cacheService.getCache('token')}`
      })
    };
  }

  postCase(caseData) {
    return this.httpClient.post<object>(`${this.apiPath}/${this.case}`, caseData, this.getHeaders());
  }

  getCases() {
    return this.httpClient.get<object>(`${this.apiPath}/${this.case}`, this.getHeaders());
  }

  getCase(caseId) {
    return this.httpClient.get<object>(`${this.apiPath}/${this.case}/${caseId}`, this.getHeaders());
  }

  updateCase(caseData, caseId) {
    return this.httpClient.put<object>(`${this.apiPath}/${this.case}/${caseId}`, caseData, this.getHeaders());
  }

  uploadFile(formData) {
    return this.httpClient.post<any>(`${this.apiPath}/case-file/uploadFile`, formData, this.getHeaders());
  }

  deleteFile(fileId) {
    return this.httpClient.delete<any>(`${this.apiPath}/case-file/deleteFile/` + fileId, this.getHeaders());
  }

  getDownloadLink(data) {
    return this.httpClient.post<any>(`${this.apiPath}/case-file/fileDownloadLink`, data, this.getHeaders());
  }
}