import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
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


  getAllSpecialty() {
    return this.httpClient.get<object>(`${this.apiPath}/specialty`)
  }

  createSpecialty(specialty) {
    return this.httpClient.post<object>(`${this.apiPath}/specialty`, specialty)
  }

}
