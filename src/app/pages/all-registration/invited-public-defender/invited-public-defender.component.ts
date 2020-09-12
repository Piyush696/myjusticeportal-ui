import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'app/services/login.service';
import { PublicDefenderService } from 'app/services/registration/public-defender.service';
import { ToasterService } from 'app/services/toaster.service';
import { CacheService } from 'app/services/cache.service';

@Component({
  selector: 'app-invited-public-defender',
  templateUrl: './invited-public-defender.component.html',
  styleUrls: ['./invited-public-defender.component.scss']
})

export class InvitedPublicDefenderComponent implements OnInit {
  tokenEmail: string;
  currentStep: number = 1;
  totalSteps: number = 2;
  roleId: number = 4;
  authCodeField: boolean;

  constructor(private activatedRoute: ActivatedRoute, private loginService: LoginService,
    private defenderService: PublicDefenderService, private toasterService: ToasterService,
    private router: Router, private cacheService: CacheService) {
    this.onGetEmailFromToken(this.activatedRoute.snapshot.params.token);
  }

  ngOnInit(): void {
  }

  onGetEmailFromToken(token) {
    this.loginService.getTokenEmail(token).subscribe((res: any) => {
      if (res.success) {
        this.tokenEmail = res.data;
      }
      else if (!res.success) {
        if (res.error.name == 'EXPIRED_TOKEN') {
          this.toasterService.showErrorToater('Sorry your token has been expired, please contact support for more information.');
        }
      }
    });
  }

  onNextClick(userData) {
    if (userData) {
      this.defenderService.updateInvitedUserData(userData).subscribe((res: any) => {
        if (res.success) {
          this.currentStep = 2;
        } else {
          this.toasterService.showErrorToater('Something went wrong, please refresh page and try again.');
        }
      });
    } else {
      this.currentStep = 1;
    }
  }

  mobileDetails(mobileDetails) {
    const mobileData = {
      "mobile": mobileDetails.mobile,
      "countryCode": mobileDetails.countryCode,
      "userName": this.tokenEmail
    }
    this.defenderService.authenticateMobile(mobileData).subscribe((generateCode: any) => {
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
    this.defenderService.verifySms(authData).subscribe((verified: any) => {
      if (verified.success) {
        this.authCodeField = false;
        this.cacheService.setCache('token', verified.token);
        this.loginService.checkToken().then((data: any) => {
          if (data.success) {
            if (data.user.status) {
              this.router.navigateByUrl('/mjp/public-defender/defender-dashboard');
            }
            else {
              this.toasterService.showWarningToater("Account under review.");
              this.router.navigateByUrl('/account-review');
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