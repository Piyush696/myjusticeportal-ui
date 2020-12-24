import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mobile-registration',
  templateUrl: './mobile-registration.component.html',
  styleUrls: ['./mobile-registration.component.scss']
})

export class MobileRegistrationComponent implements OnInit, OnChanges {
  mobileRegistrationForm: FormGroup;
  OtpField: boolean;
  public mobileMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  @Output() isPreviousClick = new EventEmitter();
  @Input() authCodeField: boolean;
  @Input() totalSteps: any;
  @Output() isMobileEvent = new EventEmitter();
  @Output() isOtpEvent = new EventEmitter();
  @Input() roleId;
  
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
      "countryCode": 1,
    }
    this.isMobileEvent.emit(data);
  }

  onVerifySms() {
    this.isOtpEvent.emit(this.mobileRegistrationForm.get('otp').value);
  }

  onPreviousClick() {
    this.isPreviousClick.emit(true)
  }
}