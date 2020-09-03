import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'app/services/login.service';
import { ToasterService } from 'app/services/toaster.service';
import { TwilioService } from 'app/services/twilio.service';
import { Store } from '@ngrx/store';
import { CacheService } from 'app/services/cache.service';

@Component({
  selector: 'app-mobile-registration',
  templateUrl: './mobile-registration.component.html',
  styleUrls: ['./mobile-registration.component.scss']
})
export class MobileRegistrationComponent implements OnInit {
  mobileRegistrationForm: FormGroup;
  OtpField: boolean;
  @Input() userName;

  constructor(private cacheService: CacheService, private store: Store<any>, private toaterService: ToasterService, private fb: FormBuilder, private loginService: LoginService, private twilioService: TwilioService, private toasterService: ToasterService, private router: Router) { }

  ngOnInit(): void {
    this.createControl();
  }

  createControl() {
    this.mobileRegistrationForm = this.fb.group({
      mobile: ['', [Validators.required]],
      countryCode: ['1', [Validators.required]],
      otp: ['', [Validators.required]]
    })
  }

  onGetOtp() {
    const data = {
      "mobile": this.mobileRegistrationForm.get('mobile').value,
      "countryCode": this.mobileRegistrationForm.get('countryCode').value,
      "userName": this.userName,
    }
    this.twilioService.getRegisterOtp(data).subscribe((otp: any) => {
      if (otp.success) {
        this.mobileRegistrationForm.get('mobile').disable()
        this.mobileRegistrationForm.get('countryCode').disable()
        this.OtpField = true;
        this.toasterService.showSuccessToater('Your code has been sent, please check your mobile device.')
      }
      else {
        this.OtpField = false;
      }
    })
  }

  onVerifySms() {
    this.twilioService.verifyRegisterCode({ otp: this.mobileRegistrationForm.get('otp').value, userName: this.userName }).subscribe((verifyData: any) => {
      console.log(verifyData)
      if (verifyData.success) {
        console.log(verifyData)
        this.OtpField = false;
        this.cacheService.setCache('token', verifyData.token);
        this.loginService.checkToken().then((data: any) => {
          if (data.success) {
            this.router.navigateByUrl('/lawyer-dashboard')
            this.toaterService.showWarningToater("Account under review.")
          }
        })
      }
      else {
        this.toasterService.showErrorToater(verifyData.data)
      }
    })
  }


}
