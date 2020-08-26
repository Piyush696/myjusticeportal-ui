import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() userName;
  @Output() isRegisterEvent = new EventEmitter()

  constructor(private fb: FormBuilder, private twilioService: TwilioService, private toasterService: ToasterService, private router: Router) { }

  ngOnInit(): void {
    this.createControl();
    this.mobileRegistrationForm.get('countryCode').setValue('1')
  }

  createControl() {
    this.mobileRegistrationForm = this.fb.group({
      mobile: ['', [Validators.required]],
      countryCode: ['', [Validators.required]],
      otp: ['', [Validators.required]]
    })
  }

  onGetOtp() {
    this.mobileRegistrationForm.get('mobile').disable()
    this.mobileRegistrationForm.get('countryCode').disable()
    const data = {
      "mobile": this.mobileRegistrationForm.get('mobile').value,
      "countryCode": this.mobileRegistrationForm.get('countryCode').value,
      "userName": this.userName,
    }
    this.twilioService.getRegisterOtp(data).subscribe((otp: any) => {
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
    this.twilioService.verifyRegisterCode({ otp: this.mobileRegistrationForm.get('otp').value, userName: this.userName }).subscribe((verifyData: any) => {
      if (verifyData.success) {
        this.OtpField = false;
        this.isRegisterEvent.emit(true);
        this.toasterService.showSuccessToater('Verified.')
      }
      else {
        this.toasterService.showSuccessToater('Wrong OTP.')
      }
    })
  }


}
