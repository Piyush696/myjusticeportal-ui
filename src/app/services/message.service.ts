import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CacheService } from './cache.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
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

  getMessageUsers() {
    return this.httpClient.get<object>(`${this.apiPath}/message`, this.getHeaders());
  }

  getAllMessages(receiverId) {
    return this.httpClient.get<object>(`${this.apiPath}/message/allMessages/` + receiverId, this.getHeaders());
  }

  getAllUserMessages() {
    return this.httpClient.get<object>(`${this.apiPath}/message/users`, this.getHeaders());
  }

  getOldUsers() {
    return this.httpClient.get<object>(`${this.apiPath}/message/oldUser`, this.getHeaders());
  }

  getLastTextedUser() {
    return this.httpClient.get<object>(`${this.apiPath}/message/allMessages`, this.getHeaders());
  }

  saveMessage(message) {
    return this.httpClient.post<object>(`${this.apiPath}​​​​​​​​/message/createMessage`, message, this.getHeaders());
  }

  saveMessage(message) {
    return this.httpClient.post<object>(`${this.apiPath}/message/createMessage`, message, this.getHeaders());
  }

}
