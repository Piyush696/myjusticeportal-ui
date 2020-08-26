import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'app/services/cache.service';
import { LoginService } from 'app/services/login.service';
import { RegistrationService } from 'app/services/registration.service';
import { ToasterService } from 'app/services/toaster.service';
import { Store } from '@ngrx/store';
import { AddUserInfo } from 'app/store/actions/userInfo.actions';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  step: number = 1;
  userName: string;
  roleId: number = 1;
  constructor(private store: Store<any>, private loginService: LoginService, private cacheService: CacheService, private registrationService: RegistrationService, private toasterService: ToasterService, private router: Router) { }

  ngOnInit(): void {
  }

  onNextClick(value) {
    this.step = 2;
    this.userName = value;
  }

  userMetaData(value) {
    this.step = 3;
  }

  onUpdateRegisteredUser(value: boolean) {
    this.registrationService.updateUser(value).subscribe((user: any) => {
      this.cacheService.setCache('token', user.token);
      this.loginService.checkToken().then((data: any) => {
        if (data.success) {
          this.store.dispatch(new AddUserInfo(Object.assign({}, data.user)));
          this.toasterService.showSuccessToater('Welcome to My Justice Portal.')
          this.router.navigateByUrl('/dashboard')
        }
      })
    })
  }

}
