import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CacheService } from 'app/services/cache.service';
import { LoginService } from 'app/services/login.service';
import { Store } from '@ngrx/store';
import { AddUserInfo } from 'app/store/actions/userInfo.actions';
import { ToasterService } from 'app/services/toaster.service';
import { TwilioService } from 'app/services/twilio.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  step: number = 1;
  constructor(private fb: FormBuilder, private router: Router, private store: Store<any>,
    private loginService: LoginService, private toasterService: ToasterService, private cacheService: CacheService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      otp: ['', [Validators.required]],
      countryCode: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
    })
  }

  onLogin() {
    this.loginService.userLogin(
      this.loginForm.get('userName').value,
      this.loginForm.get('password').value,
    ).subscribe(
      (res: any) => {
        if (res.success) {
          this.cacheService.setCache('token', res.token);
          this.loginService.checkToken().then((data: any) => {
            this.store.dispatch(new AddUserInfo(Object.assign({}, data.user)));
            if (data.success) {
              this.router.navigateByUrl('/dashboard')
              this.toasterService.showSuccessToater('Welcome to My Justice Portal.');
            }
            else {
              this.toasterService.showErrorToater(data.error.name);
            }
          })
        }
        else if (res.data === 'Invalid User.') {
          this.toasterService.showErrorToater(res.data);
        }
        else if (res.data === 'Invalid Password.') {
          this.toasterService.showErrorToater(res.data);
        }
        else {
          if (res.data === 'Please Enter Your Otp.') {
            this.toasterService.showSuccessToater('Please Enter Your Otp.');
            this.step = 2;
          }
          else {
            this.toasterService.showSuccessToater('Please Register your Mobile Number');
            this.step = 3;
          }
        }
      })
  }

  onVerify() {
    this.loginService.veriFyOtp(this.loginForm.get('userName').value, this.loginForm.get('otp').value).subscribe((isVerified: any) => {
      if (isVerified.success) {
        this.cacheService.setCache('token', isVerified.token);
        this.checkToken();
      }
      else {
        this.toasterService.showErrorToater(isVerified.data);
      }
    })
  }

  checkToken() {
    this.loginService.checkToken().then((data: any) => {
      if (data.success) {
        this.store.dispatch(new AddUserInfo(Object.assign({}, data.user)));
        this.router.navigateByUrl('/dashboard')
        this.toasterService.showSuccessToater('Welcome to My Justice Portal.');
      }
      else {
        this.toasterService.showErrorToater(data.error.name);
      }
    })
  }

  onSuccessVerify(value) {
    if (value) {
      this.loginService.jwtSet(this.loginForm.get('userName').value).subscribe((data: any) => {
        if (data.success) {
          this.cacheService.setCache('token', data.token);
          this.checkToken();
        }
      })
    }
  }
}
