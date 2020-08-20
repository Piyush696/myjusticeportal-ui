import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';


@Injectable({
  providedIn: 'root'
})
export class TwilioService {
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

  getTwilioCredentials() {
    return this.httpClient.get<object>(`${this.apiPath}/twilio`, this.getHeaders())
  }

  updateTwilioCredentials(updateTwilioCredencialData) {
    return this.httpClient.post<object>(`${this.apiPath}/twilio/twilio`, updateTwilioCredencialData, this.getHeaders())
  }

  getOtp(otpData) {
    return this.httpClient.post<object>(`${this.apiPath}/twilio`, otpData, this.getHeaders())
  }

  verifyCode(otpData) {
    return this.httpClient.post<object>(`${this.apiPath}/twilio/verify-sms`, otpData, this.getHeaders())
  }
}
