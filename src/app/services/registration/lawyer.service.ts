import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../cache.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LawyerService {
  private apiPath: string;
  allUsers: string;

  constructor(private httpClient: HttpClient, private cacheService: CacheService) {
    const env: any = environment;
    this.apiPath = env.api;
  }

  onRegistration(registrationData) {
    return this.httpClient.post<object>(`${this.apiPath}/lawyer-registration/registration`, registrationData);
  }

  authenticateMobile(mobileData) {
    return this.httpClient.post<object>(`${this.apiPath}/lawyer-registration/authenticate/registration`, mobileData);
  }

  verifySms(verifyData) {
    return this.httpClient.post<object>(`${this.apiPath}/lawyer-registration/verify-sms/registration`, verifyData);
  }

  updateInvitedUserData(emailRegistrationData) {
    return this.httpClient.post<object>(`${this.apiPath}/lawyer-registration/invitedUserUpdate`, emailRegistrationData);
  }
}