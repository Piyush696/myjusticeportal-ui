import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'app/services/toaster.service';
import { TwilioService } from 'app/services/twilio.service';

@Component({
  selector: 'app-mobile-registration',
  templateUrl: './mobile-registration.component.html',
  styleUrls: ['./mobile-registration.component.css']
})
export class MobileRegistrationComponent implements OnInit {
  mobileRegistrationForm: FormGroup;
  OtpField: boolean;
  constructor(private fb: FormBuilder, private twilioService: TwilioService, private toasterService: ToasterService, private router: Router) { }

  ngOnInit(): void {
    this.createControl();
  }

  createControl() {
    this.mobileRegistrationForm = this.fb.group({
      mobile: ['', [Validators.required]],
      countryCode: ['', [Validators.required]],
      otp: ['', [Validators.required]]
    })
  }

  onGetOtp() {
    const data = {
      "mobile": this.mobileRegistrationForm.get('mobile').value,
      "countryCode": this.mobileRegistrationForm.get('countryCode').value
    }
    this.twilioService.getOtp(data).subscribe((otp: any) => {
      if (otp.success) {
        this.OtpField = true;
        this.toasterService.showSuccessToater('Please submit your otp.')
      }
      else {
        this.OtpField = false;
      }
    })
  }

  onVerifySms() {
    this.twilioService.verifyCode({ otp: this.mobileRegistrationForm.get('otp').value }).subscribe((verifyData: any) => {
      if (verifyData.success) {
        this.OtpField = false;
        this.router.navigateByUrl('/dashboard')
        this.toasterService.showSuccessToater('Welcome to My Justice Portal.')
      }
      else {
        this.toasterService.showSuccessToater('Wrong OTP.')
      }
    })
  }
}
