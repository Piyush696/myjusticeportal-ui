import { Component, OnInit } from '@angular/core';
import { BondsmanService } from 'app/services/registration/bondsman.service';
import { ToasterService } from 'app/services/toaster.service';
import { Router } from '@angular/router';
import { CacheService } from 'app/services/cache.service';
import { LoginService } from 'app/services/login.service';
import { Store } from '@ngrx/store';
import { AddUserInfo } from 'app/store/actions/userInfo.actions';


@Component({
  selector: 'app-bondsman-registration',
  templateUrl: './bondsman-registration.component.html',
  styleUrls: ['./bondsman-registration.component.scss']
})

export class BondsmanRegistrationComponent implements OnInit {
  step: number = 1;
  totalSteps: number = 4;
  roleId: number = 6;
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

  constructor(private cacheService: CacheService, private toasterService: ToasterService,
    private router: Router, private loginService: LoginService, private bondsmanService: BondsmanService, private store: Store<any>) { }

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
      this.bondsmanService.onRegistration(this.registrationData).subscribe((res: any) => {
        if (res.success) {
          this.userName = res.data.userName;
          this.step = 4;
        }
      });
    } else {
      this.step = 3;
    }
  }

  onBackClickFromMobile(event){
    if(event){
      this.step = 3;
    }
  }

  mobileDetails(mobileDetails) {
    const mobileData = {
      "mobile": mobileDetails.mobile,
      "countryCode": mobileDetails.countryCode,
      "userName": this.userName
    }
    this.bondsmanService.authenticateMobile(mobileData).subscribe((generateCode: any) => {
      if (generateCode.success) {
        this.authCodeField = true;
        this.toasterService.showSuccessToater("Your code has been sent, please check your mobile device.");
      }
    })
  }

  onAuthCodeValidate(authcode) {
    const authData = {
      "otp": authcode,
      "userName": this.userName
    }
    this.bondsmanService.verifySms(authData).subscribe((verified: any) => {
      if (verified.success) {
        this.authCodeField = false;
        this.cacheService.setCache('token', verified.token);
        this.loginService.checkToken().then((data: any) => {
          if (data.success) {
            this.store.dispatch(new AddUserInfo(Object.assign({}, data.user)));
            this.router.navigateByUrl('/mjp/bondsman/bondsman-dashboard');
            this.toasterService.showSuccessToater("Welcome to Bondsman Dashboard")
          }
          else {
            this.toasterService.showWarningToater('Something Wrong.');
          }
        })
      }
      else {
        this.toasterService.showErrorToater(verified.data);
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