import { Component, OnInit } from '@angular/core';
import { ParalegalService } from 'app/services/registration/paralegal.service';
import { ToasterService } from 'app/services/toaster.service';
import { Router } from '@angular/router';
import { LawyerService } from 'app/services/registration/lawyer.service';
import { CacheService } from 'app/services/cache.service';
import { LoginService } from 'app/services/login.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-paralegal-registration',
  templateUrl: './paralegal-registration.component.html',
  styleUrls: ['./paralegal-registration.component.scss']
})

export class ParalegalRegistrationComponent implements OnInit {
  step: number = 1;
  totalSteps: number = 4;
  roleId: number = 4;
  userName: string;
  authCodeField: boolean;
  registrationData = {
    'user': {},
    'organization': {
      'address': {}
    },
    'facilityIds': []
  }

  constructor(private paralegalService: ParalegalService, private cacheService: CacheService,
    private store: Store<any>, private toaterService: ToasterService, private toasterService: ToasterService, private router: Router, private loginService: LoginService,) { }

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
      this.registrationData.organization = orgData.name;
      this.registrationData.organization.address = orgData.address;
    } else {
      this.step = 2;
    }
  }

  onSelectedfacility(selectedfacility) {
    if (selectedfacility) {
      this.registrationData.facilityIds = selectedfacility;
      this.paralegalService.onRegistration(this.registrationData).subscribe((res: any) => {
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
    this.paralegalService.authenticateMobile(mobileData).subscribe((generateCode: any) => {
      console.log(generateCode)
      if (generateCode.success) {
        this.authCodeField = true;
      }
    })
  }

  onAuthCodeValidate(authcode) {
    console.log(authcode)
    const authData = {
      "otp": authcode,
      "userName": this.userName
    }
    this.paralegalService.verifySms(authData).subscribe((verified: any) => {
      console.log(verified)
      if (verified.success) {
        this.authCodeField = false;
        this.cacheService.setCache('token', verified.token);
        this.loginService.checkToken().then((data: any) => {
          console.log(data)
          if (data.success) {
            if (data.user.status) {
              this.router.navigateByUrl('/lawyer-dashboard')
            }
            else {
              this.router.navigateByUrl('/account-review')
              this.toaterService.showWarningToater("Account under review.")
            }
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
}