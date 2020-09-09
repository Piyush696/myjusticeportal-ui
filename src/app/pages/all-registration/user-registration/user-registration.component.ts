import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from 'app/services/cache.service';
import { ToasterService } from 'app/services/toaster.service';
import { Store } from '@ngrx/store';
import { LoginService } from 'app/services/login.service';
import { AddUserInfo } from 'app/store/actions/userInfo.actions';
import { UserService } from 'app/services/registration/user.service';

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
  userRegData = {};

  constructor(private loginService: LoginService, private activatedRoute: ActivatedRoute,
    private store: Store<any>, private userRegistrationService: UserService,
    private cacheService: CacheService, private toasterService: ToasterService, private router: Router) {
    this.facilityCode = this.activatedRoute.snapshot.params.facilityCode;
  }

  ngOnInit(): void {
  }

  onNextClick(userDetails) {
    this.step = 2;
    this.userRegData = userDetails;
  }

  userMetaData(userMetaData) {
    this.step = 3;
    this.userRegData['userMeta'] = userMetaData;
  }

  onUpdateRegisteredUser(userSecurityQuestionData) {
    this.userRegData['securityQuestionData'] = userSecurityQuestionData;
    this.userRegData['facilityCode'] = this.facilityCode;
    this.userRegistrationService.userRegistration(this.userRegData).subscribe((user: any) => {
      if (user.token) {
        this.cacheService.setCache('token', user.token);
        this.loginService.checkToken().then((data: any) => {
          if (data.success) {
            this.store.dispatch(new AddUserInfo(Object.assign({}, data.user)));
            this.toasterService.showSuccessToater('Welcome to My Justice Portal.');
            this.router.navigateByUrl('/case');
          }
        })
      }
      else {
        this.toasterService.showSuccessToater('Welcome to My Justice Portal.');
      }
    })
  }
}