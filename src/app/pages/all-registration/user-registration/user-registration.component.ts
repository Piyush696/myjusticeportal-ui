import { Component, OnInit } from '@angular/core';
import { CacheService } from 'app/services/cache.service';
import { ToasterService } from 'app/services/toaster.service';
import { Store } from '@ngrx/store';
import { LoginService } from 'app/services/login.service';
import { AddUserInfo } from 'app/store/actions/userInfo.actions';
import { UserService } from 'app/services/registration/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})

export class UserRegistrationComponent implements OnInit {

  step: number = 1;
  roleId: number = 1;
  totalSteps: number = 3;
  facilityCode: any;
  user = {
    'userMeta':[]
  };
  userMeta;

  constructor(private loginService: LoginService,
    private store: Store<any>, private userRegistrationService: UserService,
    private cacheService: CacheService, private toasterService: ToasterService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onNextClick(userDetails) {
   // console.log(userDetails,this.user.userMeta)
    // this.userMeta = this.user.userMeta;
    
    if(this.user.userMeta)
    this.step = 2;
    this.user = userDetails;
  }

  userMetaData(userMetaData) {
   // console.log(userMetaData)
    this.step = 3;
    this.user.userMeta = userMetaData;
  }

  onUpdateRegisteredUser(userSecurityQuestionData) {
    this.user['securityQuestionData'] = userSecurityQuestionData;
    this.userRegistrationService.userRegistration(this.user).subscribe((user: any) => {
      if (user.token) {
        this.cacheService.setCache('token', user.token);
        this.loginService.checkToken().then((data: any) => {
          if (data.success) {
            this.store.dispatch(new AddUserInfo(Object.assign({}, data.user)));
            this.toasterService.showSuccessToater('Welcome to My Justice Portal.');
            this.router.navigateByUrl('/mjp/user/case');
          }
        })
      }
      else {
        this.toasterService.showSuccessToater('Welcome to My Justice Portal.');
      }
    })
  }

  isPreviousClick(value) {
   // console.log(value,this.user)
   this.userMeta = this.user.userMeta;
    if (value) {
      this.step = 2
    }
    else {
      this.step = 3
    }
  }

  onUserPageClick(user) {
    if (user) {
      this.step = 1
    } else {
      this.step = 2;
    }
  }
}