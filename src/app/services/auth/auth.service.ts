import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { CacheService } from '../../services/cache.service';
import { AddUserInfo } from 'app/store/actions/userInfo.actions';

@Injectable()
export class AuthLoadService {

  private route: string;
  private apiPath: string;

  constructor(private cacheService: CacheService,
    private httpClient: HttpClient, private store: Store<any>) {
    const env: any = environment;
    this.apiPath = env.api;
  }


  setUserbyAPI() {
    if (this.cacheService.getCache('token') != null) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.cacheService.getCache('token')}`
        })
      };

      return new Promise((resolve, reject) => {
        this.httpClient.get(`${this.apiPath}/users/check-token`, httpOptions)
          .subscribe((response: any) => {
            console.log(response)
            this.store.dispatch(new AddUserInfo(Object.assign({}, response.user)));
            resolve(true);
          },
            (err) => {
              this.cacheService.removeCache('user');
              resolve(true);
            })
      })
    }
  }
}
