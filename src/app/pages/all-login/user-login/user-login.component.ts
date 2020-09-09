import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from 'app/services/cache.service';
import { LoginService } from 'app/services/login.service';
import { Store } from '@ngrx/store';
import { AddUserInfo } from 'app/store/actions/userInfo.actions';
import { ToasterService } from 'app/services/toaster.service';
import { RegistrationService } from 'app/services/registration.service';
import { UserLoginService } from 'app/services/login/user-login.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})

export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  step: number = 1;
  facilityCode: any;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder,
    private router: Router, private store: Store<any>, private userLoginService: UserLoginService,
    private loginService: LoginService, private toasterService: ToasterService,
    private cacheService: CacheService, private registrationService: RegistrationService) {
    this.facilityCode = this.activatedRoute.snapshot.params.facilityCode;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      otp: ['', [Validators.required]]
    })
  }

  onLogin() {
    const loginData = {
      "userName": this.loginForm.get('userName').value,
      "password": this.loginForm.get('password').value,
      "facilityCode": this.facilityCode
    }
    this.userLoginService.userLogin(loginData).subscribe((res: any) => {
      if (res.success) {
        this.cacheService.setCache('token', res.token);
        this.loginService.checkToken().then((data: any) => {
          this.store.dispatch(new AddUserInfo(Object.assign({}, data.user)));
          if (data.success) {
            this.router.navigateByUrl('/user-dashboard')
            this.toasterService.showSuccessToater('Welcome to My Justice Portal.');
          }
          else {
            this.toasterService.showErrorToater(data.data);
          }
        })
      }
      else {
        this.toasterService.showErrorToater(res.data);
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
}