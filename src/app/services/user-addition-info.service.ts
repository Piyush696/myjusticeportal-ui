import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class UserAdditionInfoService {
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

  getUsers() {
    return this.httpClient.get<object>(`${this.apiPath}/userAdditionalInfo`, this.getHeaders());
  }

  uploadFile(formData) {
    return this.httpClient.post<any>(`${this.apiPath}/userAdditionalInfo/uploadProfile`, formData, this.getHeaders());
  }

  updateAdditionalInfo(userData) {
    return this.httpClient.put<Object>(`${this.apiPath}/userAdditionalInfo`, userData, this.getHeaders());
  }

  getSponsorUsers() {
    return this.httpClient.get<object>(`${this.apiPath}/userAdditionalInfo/sponsorsUser`, this.getHeaders());
  }

  getSingleUsers(userId) {
    return this.httpClient.get<object>(`${this.apiPath}/userAdditionalInfo/${userId}`, this.getHeaders());
  }

  setCasesLawyer(selectedCases) {
    return this.httpClient.post<any>(`${this.apiPath}/userAdditionalInfo`, selectedCases, this.getHeaders());
  }

  getLawyerCases() {
    return this.httpClient.get<object>(`${this.apiPath}/userAdditionalInfo/lawyer/Cases`, this.getHeaders());
  }

  updateInmateStatus(updateStatus) {
    return this.httpClient.post<any>(`${this.apiPath}/userAdditionalInfo/inmateStatus`, updateStatus, this.getHeaders());
  }

  updateLawywrStatus(caseId) {
    return this.httpClient.post<any>(`${this.apiPath}/userAdditionalInfo/status-update`, caseId, this.getHeaders());
  }

  getDashboardCounts() {
    return this.httpClient.get<object>(`${this.apiPath}/userAdditionalInfo/dasboard/count`, this.getHeaders());
  }

}
