import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
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

  createFacility(facilityData) {
    return this.httpClient.post<object>(`${this.apiPath}/facility`, facilityData, this.getHeaders());
  }

  updateFacility(facilityData, facilityId) {
    return this.httpClient.put<object>(`${this.apiPath}/facility/` + facilityId, facilityData, this.getHeaders());
  }

  getAllFacility() {
    return this.httpClient.get<object>(`${this.apiPath}/facility`, this.getHeaders())
  }

  deleteFacility(facilityId) {
    return this.httpClient.delete<object>(`${this.apiPath}/facility/` + facilityId, this.getHeaders())
  }

  checkFacilityCode(code) {
    return this.httpClient.get<Object>(`${this.apiPath}/facility/facilityCode/check/` + code, this.getHeaders());
  }

  getFacilities() {
    return this.httpClient.get<object>(`${this.apiPath}/user/roleFacility`)
  }

  getFacilitiesUserCount() {
    return this.httpClient.get<Object>(`${this.apiPath}/facility/facility/userCount`, this.getHeaders());
  }


}
