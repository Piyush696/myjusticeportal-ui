import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CacheService } from 'app/services/cache.service';
import { Store } from '@ngrx/store';
import { AddUserInfo } from 'app/store/actions/userInfo.actions';
import { LoginService } from 'app/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private loginService: LoginService, private store: Store<any>, private cacheService: CacheService) {
  }

  canActivate() {

    return this.loginService.checkToken().then((data: any) => {
      console.log(data)
      if (data.success) {
        // this.store.dispatch(new AddUserInfo(Object.assign({}, data.user)));
        return true;
      } else {
        console.log(data)
        this.cacheService.removeCache('user');
        this.router.navigateByUrl('/login')
        return false;

      }
    }).catch((x) => {
      console.log(x)
      this.cacheService.removeCache('user');
      this.router.navigateByUrl('/login')
      return false;

    })
    
  }

}
