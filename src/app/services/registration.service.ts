import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiPath: string;
  private createUser: string;
  allUsers: string;

  constructor(private httpClient: HttpClient) {
    const env: any = environment;
    this.apiPath = env.api
    this.createUser = 'user';
  }


  // getHeaders() {
  //   return {
  //     headers: new HttpHeaders({
  //       'Authorization': `Bearer ${this.cacheService.getCache('user').token}`
  //     })
  //   };
  // }
  addUser(profileData) {
    return this.httpClient.post<object>(`${this.apiPath}/${this.createUser}/`, profileData)
  }
  // getAllusers() {
  //   return this.httpClient.get<object>(`${this.apiPath}/${this.allUsers}/`)
  // }

}
