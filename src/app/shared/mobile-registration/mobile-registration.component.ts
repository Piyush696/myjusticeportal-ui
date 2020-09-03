import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class MobileRegistrationComponent implements OnInit, OnChanges {
  mobileRegistrationForm: FormGroup;
  OtpField: boolean;
  @Output() isMobileEvent = new EventEmitter();
  @Output() isOtpEvent = new EventEmitter();
  @Input() authCodeField: boolean;

  constructor(private fb: FormBuilder) { }
  ngOnChanges() {
    if (this.authCodeField) {
      this.OtpField = true;
    }
    else {
      this.OtpField = false;
    }
  }

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
    }
    this.isMobileEvent.emit(data)
  }

  onVerifySms() {
    this.isOtpEvent.emit(this.mobileRegistrationForm.get('otp').value)
  }


}
