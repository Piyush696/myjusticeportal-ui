import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CacheService } from './../cache.service';


@Injectable({
  providedIn: 'root'
})
export class LawyerService {
  private apiPath: string;

  constructor(private httpClient: HttpClient) {
    const env: any = environment;
    this.apiPath = env.api
  }

  lawyerLogin(lawyerLoginData) {
    return this.httpClient.post<object>(`${this.apiPath}/lawyerLogin/login`, lawyerLoginData)
  }
  verifylawyerLogin(verifyData) {
    return this.httpClient.post<object>(`${this.apiPath}/lawyerLogin/verify-otp`, verifyData)
  }
}
