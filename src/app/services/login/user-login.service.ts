import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CacheService } from './../cache.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private apiPath: string;

  constructor(private httpClient: HttpClient) {
    const env: any = environment;
    this.apiPath = env.api
  }

  userLogin(userLoginData) {
    return this.httpClient.post<object>(`${this.apiPath}/userLogin`, userLoginData)
  }
}
