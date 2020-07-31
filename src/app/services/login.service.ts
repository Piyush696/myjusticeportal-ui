import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
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
  constructor(private httpClient: HttpClient, private cacheService: CacheService,) {

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
    return this.httpClient.get(`${this.apiPath}/${this.route}/check-token`, httpOptions);
  }

  userLogin(user: string, password: string) {
    return this.httpClient.post<object>(`${this.apiPath}/${this.loginUser}`, { user: user, password: password })
  }
}
