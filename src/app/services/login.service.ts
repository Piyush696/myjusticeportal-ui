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
    return this.httpClient.get(`${this.apiPath}/${this.route}/check-token`, httpOptions).toPromise();
  }

  async userLogin(user: string, password: string): Promise<{ success: boolean }> {
    try {
      const res: any = await this.httpClient.post<Object>(`${this.apiPath}/${this.loginUser}`, {
        user,
        password
      }).toPromise();

      if (res && res.token) {

        this.authenticated = true;

        this.cacheService.setCache('token', res.token);

        return of({ success: true, res }).toPromise();
      } else {

        return of({ success: false, ...res }).toPromise();
      }

    } catch (e) {
      return of({ success: false }).toPromise();
    }

  }
}
