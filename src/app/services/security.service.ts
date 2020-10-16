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
    return this.httpClient.post<object>(`${this.apiPath}/${this.allSecurityQuestion}`, securityQuestionAnswer)
  }

  getUserSecurityQuestions(userName: string) {
    return this.httpClient.post<object>(`${this.apiPath}/${this.allSecurityQuestion}/forgot-password`, { userName });
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

  updateSecurityQuestionAnswer(securityQuestionData) {
    return this.httpClient.post<object>(`${this.apiPath}/${this.allSecurityQuestion}/user/update/securityQuestion`, { securityQuestionData }, this.getHeaders())
  }

  onResetPassword(resetData) {
    return this.httpClient.patch<Object>(`${this.apiPath}/securityQuestion`, resetData);
  }
  getUpdateUserSecurityQuestion() {
    return this.httpClient.get<object>(`${this.apiPath}/${this.allSecurityQuestion}/user/userSecurityQuestions`, this.getHeaders())
  }
}