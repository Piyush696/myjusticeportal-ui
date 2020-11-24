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
    return this.httpClient.get<object>(`${this.apiPath}/hirealawyer/users`, this.getHeaders());
  }

  getRequestedCases(status) {
    return this.httpClient.post<object>(`${this.apiPath}/hirealawyer/requested-cases`, status, this.getHeaders());
  }

  getRequestedCaseById(caseId) {
    return this.httpClient.get<object>(`${this.apiPath}/hirealawyer/requested-case/` + caseId, this.getHeaders());
  }

  approveCase(lawyer_caseId) {
    return this.httpClient.post<any>(`${this.apiPath}/hirealawyer/approve-case`, lawyer_caseId, this.getHeaders());
  }

  rejectCase(lawyer_caseId) {
    return this.httpClient.post<any>(`${this.apiPath}/hirealawyer/reject-case`, lawyer_caseId, this.getHeaders());
  }

  getDownloadLink(data) {
    return this.httpClient.post<any>(`${this.apiPath}/hirealawyer/fileDownloadLink`, data, this.getHeaders());
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
  hideCase(caseId) {
    return this.httpClient.post<any>(`${this.apiPath}/hirealawyer/hide/hide-case`, caseId, this.getHeaders());
  }
  getAllCases() {
    return this.httpClient.get<any>(`${this.apiPath}/case/lawyer/allCases`, this.getHeaders());
  }

  getLawyerProfileInfo(userId) {
    return this.httpClient.get<any>(`${this.apiPath}/hirealawyer/getLawyerInfo/${userId}`, this.getHeaders());
  }

  getCase(caseId) {
    return this.httpClient.get<object>(`${this.apiPath}/case/` + caseId, this.getHeaders());
  }

}