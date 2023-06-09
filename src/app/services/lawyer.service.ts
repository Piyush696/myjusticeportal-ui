import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';
@Injectable({
  providedIn: 'root'
})
export class LawyerService {

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


  getClients() {
    return this.httpClient.get<object>(`${this.apiPath}/lawyer/users`, this.getHeaders());
  }

  postPay(data) {
    return this.httpClient.post<object>(`${this.apiPath}/stripe`, data);
  }

  updatePlan(data) {
    return this.httpClient.post<object>(`${this.apiPath}/stripe/update_plan`, data, this.getHeaders());
  }

  subscribePlan(customer) {
    return this.httpClient.post<object>(`${this.apiPath}/stripe/subscribe_plan`, customer);
  }

  validateCard(data) {
    return this.httpClient.post<object>(`${this.apiPath}/stripe/validate_card`, data);
  }

  getCardDetails() {
    return this.httpClient.get<object>(`${this.apiPath}/stripe/subcription_details`, this.getHeaders())
  }

  deleteLawyerCase(lawyerId, caseId) {
    return this.httpClient.put<object>(`${this.apiPath}/lawyer/${caseId}`, { lawyerId }, this.getHeaders());
  }

  // getBillingDetails() {
  //   return this.httpClient.post<object>(`${this.apiPath}/stripe/subcription_details`, this.getHeaders())
  // }

  validate_coupan(coupon) {
    return this.httpClient.post<object>(`${this.apiPath}/stripe/validate_coupan`, coupon, this.getHeaders())
  }

  updateCardDetails(data) {
    return this.httpClient.post<object>(`${this.apiPath}/stripe/update_card`, data, this.getHeaders())
  }

  chargeLawyer(data) {
    return this.httpClient.post<object>(`${this.apiPath}/stripe/charge`, data, this.getHeaders())
  }


}
