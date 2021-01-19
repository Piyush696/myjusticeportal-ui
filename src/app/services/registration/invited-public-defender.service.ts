import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../cache.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvitedPublicDefenderService {
  private apiPath: string;
  allUsers: string;

  constructor(private httpClient: HttpClient, private cacheService: CacheService) {
    const env: any = environment;
    this.apiPath = env.api;
  }

  onRegistration(registrationData) {
    return this.httpClient.post<object>(`${this.apiPath}/invited-public-defender-registration/registration`, registrationData);
  }

  authenticateMobile(otpData) {
    return this.httpClient.post<object>(`${this.apiPath}/invited-public-defender-registration/authenticate/registration`, otpData);
  }

  verifySms(verifyData) {
    return this.httpClient.post<object>(`${this.apiPath}/invited-public-defender-registration/verify-sms/registration`, verifyData);
  }
}
