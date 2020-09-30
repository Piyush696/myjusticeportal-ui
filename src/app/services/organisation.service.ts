import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})

export class OrganisationService {
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

  getOrganisationAddressDetails() {
    return this.httpClient.get<object>(`${this.apiPath}/organization/`, this.getHeaders())
  }

  getOrganisationUsers() {
    return this.httpClient.get<object>(`${this.apiPath}/organization/all-user`, this.getHeaders())
  }

  getOrganisationFacilities() {
    return this.httpClient.get<object>(`${this.apiPath}/organization/all-facilities`, this.getHeaders())
  }

  addFacilitiesOrganisation(facilityIds) {
    return this.httpClient.post<object>(`${this.apiPath}/organization/add-facility`, { facilityIds }, this.getHeaders())
  }

  inviteUserOrganisation(inviteUserData) {
    return this.httpClient.post<object>(`${this.apiPath}/organization/invite-user`, inviteUserData, this.getHeaders())
  }

  removeFacilitiesOrganisation(facilityId) {
    return this.httpClient.post<object>(`${this.apiPath}/organization/remove-facility`, { facilityId }, this.getHeaders())
  }

  updateOrganisation(data, addressId) {
    return this.httpClient.put<object>(`${this.apiPath}/organization/${addressId}`, data, this.getHeaders())
  }
  uploadFile(formData) {
    return this.httpClient.post<any>(`${this.apiPath}/organization/uploadLogo`, formData, this.getHeaders());
  }
}