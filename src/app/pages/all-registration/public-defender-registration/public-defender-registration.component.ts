import { Component, OnInit } from '@angular/core';
import { PublicDefenderService } from 'app/services/registration/public-defender.service';
import { ToasterService } from 'app/services/toaster.service';
import { Router } from '@angular/router';
import { CacheService } from 'app/services/cache.service';
import { LoginService } from 'app/services/login.service';
import { Store } from '@ngrx/store';
import { AddUserInfo } from 'app/store/actions/userInfo.actions';

@Component({
  selector: 'app-public-defender-registration',
  templateUrl: './public-defender-registration.component.html',
  styleUrls: ['./public-defender-registration.component.scss']
})

export class PublicDefenderRegistrationComponent implements OnInit {
  step: number = 1;
  totalSteps: number = 4;
  roleId: number = 2;
  userName: string;
  authCodeField: boolean;
  registrationData = {
    'user': {},
    'organization': {
      'address': {}
    },
    'facilityIds': []
  }
  user: any;
  orgAddress: {};

  constructor(private defenderService: PublicDefenderService, private cacheService: CacheService,
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

  onCreateOrganisation(orgData) {
    if (orgData) {
      this.step = 3;
      this.registrationData.organization = orgData;
      this.registrationData.organization.address = orgData.address;
    } else {
      this.step = 2;
    }
  }

  onSelectedfacility(selectedfacility) {
    if (selectedfacility) {
      this.registrationData.facilityIds = selectedfacility;
      this.defenderService.onRegistration(this.registrationData).subscribe((res: any) => {
        if (res.success) {
          this.userName = res.data.userName;
          this.step = 4;
        }
      });
    } else {
      this.step = 3;
    }
  }

  mobileDetails(mobileDetails) {
    const mobileData = {
      "mobile": mobileDetails.mobile,
      "countryCode": mobileDetails.countryCode,
      "userName": this.userName
    }
    this.defenderService.authenticateMobile(mobileData).subscribe((generateCode: any) => {
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
    this.defenderService.verifySms(authData).subscribe((verified: any) => {
      if (verified.success) {
        this.authCodeField = false;
        this.cacheService.setCache('token', verified.token);
        this.loginService.checkToken().then((data: any) => {
          if (data.success) {
            this.store.dispatch(new AddUserInfo(Object.assign({}, data.user)));
            this.router.navigateByUrl('/mjp/public-defender/defender-dashboard');
            this.toasterService.showWarningToater("Account under review.")
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
      this.step = 1;
      this.user = this.registrationData.user
    } else {
      this.step = 2;
    }
  }
  onBackClick(back) {
    if (back) {
      this.step = 2;
      this.orgAddress = this.registrationData.organization
    } else {
      this.step = 3;
    }
  }
}