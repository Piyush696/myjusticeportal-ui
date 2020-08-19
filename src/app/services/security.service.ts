import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private apiPath: string;
  private allSecurityQuestion: string;

  constructor(private httpClient: HttpClient, private cacheService: CacheService) {
    const env: any = environment;
    this.apiPath = env.api
    this.allSecurityQuestion = 'securityQuestion';
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.cacheService.getCache('token')}`
      })
    };
  }

  getAllSecurityRoles(roleId) {
    return this.httpClient.get<object>(`${this.apiPath}/${this.allSecurityQuestion}/${roleId}`)
  }

  createSecurityAnswers(securityQuestionAnswer) {
    return this.httpClient.post<object>(`${this.apiPath}/${this.allSecurityQuestion}`, securityQuestionAnswer, this.getHeaders())
  }

  getUserSecurityQuestions(user: string) {
    return this.httpClient.post<object>(`${this.apiPath}/${this.allSecurityQuestion}/securityQues`, { user })
  }

  checkAnswer(data) {
    return this.httpClient.post<object>(`${this.apiPath}/${this.allSecurityQuestion}/check-answer`, data)
  }

  resetPassword(resetData) {
    return this.httpClient.put<Object>(`${this.apiPath}/user/reset-pass`, resetData);
  }

  getUserSecurityQuestion() {
    return this.httpClient.get<object>(`${this.apiPath}/${this.allSecurityQuestion}/user/securityQuestions`, this.getHeaders())
  }

  updateSecurityQuestionAnswer(updatedAnswer) {
    return this.httpClient.put<object>(`${this.apiPath}/${this.allSecurityQuestion}/securityQuestion`, updatedAnswer, this.getHeaders())
  }


}