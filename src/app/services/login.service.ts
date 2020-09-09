import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiPath: string;
  private loginUser: string;
  private route: string;
  protected authenticated: boolean;

  constructor(private httpClient: HttpClient, private cacheService: CacheService) {

    const env: any = environment;
    this.apiPath = env.api
    this.loginUser = 'users/login';
    this.authenticated = !!this.cacheService.getCache('user');
    this.route = 'users';
  }

  checkToken() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.cacheService.getCache('token')}`
      })
    };
    return this.httpClient.get(`${this.apiPath}/${this.route}/check-token`, httpOptions).toPromise();
  }

  userLogin(userName: string, password: string) {
    return this.httpClient.post<object>(`${this.apiPath}/${this.loginUser}`, { userName: userName, password: password })
  }

  veriFyOtp(userName: string, otp: string) {
    return this.httpClient.post<object>(`${this.apiPath}/${this.route}/verify-otp`, { userName: userName, otp: otp })
  }

  getTokenEmail(token) {
    return this.httpClient.patch<object>(`${this.apiPath}/users/getTokenEmail`, { token });
  }
}