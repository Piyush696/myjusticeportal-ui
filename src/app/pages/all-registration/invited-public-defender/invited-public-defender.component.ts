import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'app/services/login.service';
import { PublicDefenderService } from 'app/services/registration/public-defender.service';
import { ToasterService } from 'app/services/toaster.service';
import { CacheService } from 'app/services/cache.service';
import { InvitedPublicDefenderService } from 'app/services/registration/invited-public-defender.service';

@Component({
  selector: 'app-invited-public-defender',
  templateUrl: './invited-public-defender.component.html',
  styleUrls: ['./invited-public-defender.component.scss']
})

export class InvitedPublicDefenderComponent implements OnInit {
  tokenEmail: string;
  currentStep: number = 1;
  step: number = 1;
  totalSteps: number = 3;
  roleId: number = 5;
  authCodeField: boolean;
  message: string;
  registrationData = {
    'user': {},
  }
  currentState = [];

  constructor(private activatedRoute: ActivatedRoute, private loginService: LoginService,
    private inviteddefenderService: InvitedPublicDefenderService, private toasterService: ToasterService,
    private router: Router, private cacheService: CacheService) {
    this.onGetEmailFromToken(this.activatedRoute.snapshot.params.token);
  }

  ngOnInit(): void {
  }

  userMetaData(userMetaData) {
    this.step = 3;
    this.registrationData['userMeta'] = userMetaData;
          this.inviteddefenderService.onRegistration(this.registrationData).subscribe((res: any) => {
        if (res.success) {
          this.currentStep = 3;
        } else {
          this.toasterService.showErrorToater('Something went wrong, please refresh page and try again.');
        }
      });
  }

  onGetEmailFromToken(token) {
    this.loginService.getTokenEmail(token).subscribe((res: any) => {
      if (res.success) {
        this.tokenEmail = res.data;
      }
      else if (!res.success) {
        this.tokenEmail = 'EXPIRED_TOKEN';
        if (res.error.name == 'EXPIRED_TOKEN') {
          this.message = 'Sorry the invited link has been expired, please contact support for more information.';
          this.toasterService.showErrorToater(this.message);
        }
      }
    });
  }

  onNextClick(userData) {
    if (userData) {
      this.registrationData.user = userData;
      this.currentStep = 2;
    } else {
      this.currentStep = 1;
    }
  }

  stateEvent(state) {
    this.currentState = [...state]
  }

  mobileDetails(mobileDetails) {
    const mobileData = {
      "mobile": mobileDetails.mobile,
      "countryCode": mobileDetails.countryCode,
      "userName": this.tokenEmail
    }
    this.inviteddefenderService.authenticateMobile(mobileData).subscribe((generateCode: any) => {
      if (generateCode.success) {
        this.authCodeField = true;
        this.toasterService.showSuccessToater("Your code has been sent, please check your mobile device.");
      }
    })
  }

  onAuthCodeValidate(authcode) {
    const authData = {
      "otp": authcode,
      "userName": this.tokenEmail
    }
    this.inviteddefenderService.verifySms(authData).subscribe((verified: any) => {
      if (verified.success) {
        this.authCodeField = false;
        this.cacheService.setCache('token', verified.token);
        this.loginService.checkToken().then((data: any) => {
          if (data.success) {
            if (data.user.status) {
              this.router.navigateByUrl('/mjp/public-defender/defender-dashboard');
              this.toasterService.showWarningToater("Account under review.")
            }
            else {
              this.router.navigateByUrl('/mjp/public-defender/defender-dashboard');
              this.toasterService.showWarningToater("Account under review.")
            }
          }
          else {
            this.toasterService.showWarningToater('Something went wrong.');
          }
        })
      }
      else {
        this.toasterService.showErrorToater(verified.data);
      }
    })
  }
}