import { Component, OnInit } from '@angular/core';
import { BondsmanService } from 'app/services/registration/bondsman.service';
import { ToasterService } from 'app/services/toaster.service';
import { Router } from '@angular/router';
import { CacheService } from 'app/services/cache.service';
import { LoginService } from 'app/services/login.service';

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

  constructor(private cacheService: CacheService, private toasterService: ToasterService,
    private router: Router, private loginService: LoginService, private bondsmanService: BondsmanService) { }

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

  mobileDetails(mobileDetails) {
    const mobileData = {
      "mobile": mobileDetails.mobile,
      "countryCode": mobileDetails.countryCode,
      "userName": this.userName
    }
    this.bondsmanService.authenticateMobile(mobileData).subscribe((generateCode: any) => {
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
    this.bondsmanService.verifySms(authData).subscribe((verified: any) => {
      if (verified.success) {
        this.authCodeField = false;
        this.cacheService.setCache('token', verified.token);
        this.loginService.checkToken().then((data: any) => {
          if (data.success) {
            if (data.user.status) {
              this.router.navigateByUrl('/lawyer-dashboard')
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