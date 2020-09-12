import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CacheService } from 'app/services/cache.service';
import { FacilityService } from 'app/services/registration/facility.service';
import { LoginService } from 'app/services/login.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-facility-registration',
  templateUrl: './facility-registration.component.html',
  styleUrls: ['./facility-registration.component.scss']
})

export class FacilityRegistrationComponent implements OnInit {
  step: number = 1;
  roleId: number = 3;
  userName: string;
  totalSteps: number = 2;
  authCodeField: boolean;
  facililityRegistrationData = {
    'user': {

    },
    'facilityCode': {}
  }
  constructor(private facilityService: FacilityService, private cacheService: CacheService,
    private store: Store<any>, private toasterService: ToasterService,
    private router: Router, private loginService: LoginService, private activatedRoute: ActivatedRoute) {
    this.facililityRegistrationData.facilityCode = this.activatedRoute.snapshot.params.facilityCode;
  }

  ngOnInit(): void {
  }

  onNextClick(facilityDetails) {
    console.log(facilityDetails)
    this.userName = facilityDetails.userName
    this.facililityRegistrationData.user = facilityDetails;
    this.facilityService.onRegistration(this.facililityRegistrationData).subscribe((register: any) => {
      console.log(register)
      if (register.success) {
        this.step = 2;
      } else {
        this.step = 1;
      }
    })
  }

  mobileDetails(mobileDetails) {
    const mobileData = {
      "mobile": mobileDetails.mobile,
      "countryCode": mobileDetails.countryCode,
      "userName": this.userName
    }
    console.log(mobileData)
    this.facilityService.authenticateMobile(mobileData).subscribe((generateCode: any) => {
      if (generateCode.success) {
        this.authCodeField = true;
        this.toasterService.showSuccessToater("Your code has been sent, please check your mobile device.")
      }
    })
  }

  onAuthCodeValidate(authcode) {
    const authData = {
      "otp": authcode,
      "userName": this.userName
    }
    console.log(authData)
    console.log(this.facililityRegistrationData)
    this.facilityService.verifySms(authData).subscribe((verified: any) => {
      if (verified.success) {
        this.authCodeField = false;
        this.cacheService.setCache('token', verified.token);
        this.loginService.checkToken().then((data: any) => {
          if (data.success) {
            if (data.user.status) {
              this.router.navigateByUrl('/mjp/facility/facility-dashboard');
            }
            else {
              this.router.navigateByUrl('/account-review')
              this.toasterService.showWarningToater("Account under review.")
            }
          }
          else {
            this.toasterService.showWarningToater('Something Wrong.')
          }
        })
      }
      else {
        this.toasterService.showErrorToater(verified.data)
      }
    })
  }
}