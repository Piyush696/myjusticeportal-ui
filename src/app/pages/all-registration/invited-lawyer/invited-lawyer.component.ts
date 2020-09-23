import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'app/services/login.service';
import { LawyerService } from 'app/services/registration/lawyer.service';
import { ToasterService } from 'app/services/toaster.service';
import { CacheService } from 'app/services/cache.service';

@Component({
  selector: 'app-invited-lawyer',
  templateUrl: './invited-lawyer.component.html',
  styleUrls: ['./invited-lawyer.component.scss']
})

export class InvitedLawyerComponent implements OnInit {
  tokenEmail: string;
  currentStep: number = 1;
  totalSteps: number = 2;
  roleId: number = 3;
  authCodeField: boolean;
  message: string = '* Use legal name of the facility for registration.';

  constructor(private activatedRoute: ActivatedRoute, private loginService: LoginService,
    private lawyerService: LawyerService, private toasterService: ToasterService,
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
      this.lawyerService.updateInvitedUserData(userData).subscribe((res: any) => {
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
    this.lawyerService.authenticateMobile(mobileData).subscribe((generateCode: any) => {
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
    this.lawyerService.verifySms(authData).subscribe((verified: any) => {
      if (verified.success) {
        this.authCodeField = false;
        this.cacheService.setCache('token', verified.token);
        this.loginService.checkToken().then((data: any) => {
          if (data.success) {
            if (data.user.status) {
              this.router.navigateByUrl('/mjp/lawyer/lawyer-dashboard');
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