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
    private loginService: LoginService, private store: Store<any>,private cacheService: CacheService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.loginService.checkToken().subscribe((data: any) => {
      if (data.success) {
        this.store.dispatch(new AddUserInfo(Object.assign({}, data.user)));
        return true;
      }
      else {
        this.cacheService.removeCache('user');
        this.router.navigateByUrl('/login')
        return false;
      }
    }, () => {
      this.cacheService.removeCache('user');
      this.router.navigateByUrl('/login')
      return false;
    })
    return false;
  }

}
