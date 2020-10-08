import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'app/services/toaster.service';
import { Router } from '@angular/router';
import { LawyerService } from 'app/services/registration/lawyer.service';
import { CacheService } from 'app/services/cache.service';
import { LoginService } from 'app/services/login.service';
import { Store } from '@ngrx/store';
import { AddUserInfo } from 'app/store/actions/userInfo.actions';

@Component({
  selector: 'app-lawyer-registration',
  templateUrl: './lawyer-registration.component.html',
  styleUrls: ['./lawyer-registration.component.scss']
})

export class LawyerRegistrationComponent implements OnInit {
  step: number = 1;
  totalSteps: number = 4;
  roleId: number = 3;
  userName: string;
  authCodeField: boolean;
  message: string = '* Please register with your legal name, as presented to the Bar Association in your state(s).';
  registrationData = {
    'user': {},
    'organization': {
      'address': {}
    },
    'facilityIds': []
  }
  user: any;
  orgAddress: {};
  currentState: any;

  constructor(private lawyerService: LawyerService, private cacheService: CacheService,
    private toaterService: ToasterService, private toasterService: ToasterService,
    private router: Router, private loginService: LoginService, private store: Store<any>) { }

  ngOnInit(): void {
  }

  onNextClick(userData) {
    if (userData) {
      this.registrationData.user = userData;
      this.step = 2;
    } else {
      this.step = 1;
    }
  }

  userMetaData(userMetaData) {
    this.step = 3;
    this.registrationData['userMeta'] = userMetaData;
  }

  onUserPageClick(user) {
    if (user) {
      this.step = 1
    } else {
      this.step = 2;
    }
  }

  onCreateOrganisation(orgData) {
    if (orgData) {
      this.step = 4;
      this.registrationData.organization = orgData;
      this.registrationData.organization.address = orgData.address;
    } else {
      this.step = 3;
    }
  }

  stateEvent(state) {
    this.currentState = state
  }

  onSelectedfacility(selectedfacility) {
    if (selectedfacility) {
      this.registrationData.facilityIds = selectedfacility;
      this.lawyerService.onRegistration(this.registrationData).subscribe((res: any) => {
        if (res.success) {
          this.userName = res.data.userName;
          this.step = 5;
        }
      });
    } else {
      this.step = 4;
    }
  }

  mobileDetails(mobileDetails) {
    const mobileData = {
      "mobile": mobileDetails.mobile,
      "countryCode": mobileDetails.countryCode,
      "userName": this.userName
    }
    this.lawyerService.authenticateMobile(mobileData).subscribe((generateCode: any) => {
      if (generateCode.success) {
        this.authCodeField = true;
        this.toaterService.showSuccessToater("Your code has been sent, please check your mobile device.")
      }
    })
  }

  onAuthCodeValidate(authcode) {
    const authData = {
      "otp": authcode,
      "userName": this.userName
    }
    this.lawyerService.verifySms(authData).subscribe((verified: any) => {
      if (verified.success) {
        this.authCodeField = false;
        this.cacheService.setCache('token', verified.token);
        this.loginService.checkToken().then((data: any) => {
          if (data.success) {
            this.store.dispatch(new AddUserInfo(Object.assign({}, data.user)));
            this.router.navigateByUrl('/mjp/lawyer/lawyer-dashboard');
            this.toaterService.showWarningToater("Account under review.")
          }
          else {
            this.toaterService.showWarningToater('Something Wrong.')
          }
        })
      }
      else {
        this.toasterService.showErrorToater(verified.data)
      }
    })
  }

  onPreviousClick(back) {
    if (back) {
      this.step = 2;
      this.user = this.registrationData.user
    } else {
      this.step = 3;
    }
  }
  onBackClick(back) {
    if (back) {
      this.step = 3;
      this.orgAddress = this.registrationData.organization
    } else {
      this.step = 4;
    }
  }
}