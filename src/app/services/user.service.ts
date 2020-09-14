import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiPath: string;
  private getAllUser: string;
  allUsers: string;

  constructor(private httpClient: HttpClient, private cacheService: CacheService) {
    const env: any = environment;
    this.apiPath = env.api
    this.getAllUser = 'user';
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.cacheService.getCache('token')}`
      })
    };
  }

  getUsers() {
    return this.httpClient.get<object>(`${this.apiPath}/${this.getAllUser}`, this.getHeaders());
  }

  getSingleUser() {
    return this.httpClient.get<object>(`${this.apiPath}/${this.getAllUser}/user`, this.getHeaders());
  }

  resetPassword({ oldPassword, password }) {
    return this.httpClient.put<Object>(`${this.apiPath}/${this.getAllUser}/password`, { oldPassword: oldPassword, password: password }, this.getHeaders());
  }

  updateUser(userData) {
    return this.httpClient.put<Object>(`${this.apiPath}/${this.getAllUser}`, userData, this.getHeaders());
  }

  deleteUser(userId) {
    return this.httpClient.delete<object>(`${this.apiPath}/user/` + userId, this.getHeaders());
  }

  updateUserInfo(userData) {
    return this.httpClient.put<Object>(`${this.apiPath}/${this.getAllUser}/updateUser`, userData, this.getHeaders());
  }

  getSingleUserById(userId) {
    return this.httpClient.get<object>(`${this.apiPath}/user/singleUser/` + userId, this.getHeaders());
  }

  updateSingleUser(userData) {
    return this.httpClient.put<Object>(`${this.apiPath}/user/updateSingleUser`, userData, this.getHeaders());
  }

  updateStatus(userData) {
    return this.httpClient.put<Object>(`${this.apiPath}/user/updateStatus`, userData, this.getHeaders());
  }

  changeRole(roleId) {
    return this.httpClient.put<Object>(`${this.apiPath}/user/changeRole`, roleId, this.getHeaders());
  }

  addUser(userData) {
    return this.httpClient.post<Object>(`${this.apiPath}/user/createUser`, userData, this.getHeaders());
  }
}