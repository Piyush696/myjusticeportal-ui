import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiPath: string;
  private allRoles: string;
  allUsers: string;

  constructor(private httpClient: HttpClient) {
    const env: any = environment;
    this.apiPath = env.api
    this.allRoles = 'role';
  }

  getAllRoles() {
    return this.httpClient.get<object>(`${this.apiPath}/${this.allRoles}`)
  }
}
