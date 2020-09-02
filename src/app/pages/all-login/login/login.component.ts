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
import { LawyerService } from 'app/services/login/lawyer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  step: number = 1;
  facilityCode: any;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder,
    private router: Router, private store: Store<any>,
    private lawyerService: LawyerService, private toasterService: ToasterService,
    private cacheService: CacheService, private loginService: LoginService) {
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
      "password": this.loginForm.get('password').value
    }
    this.lawyerService.lawyerLogin(loginData).subscribe(
      (res: any) => {
        if (res.success) {
          this.cacheService.setCache('token', res.token);
          this.loginService.checkToken().then((data: any) => {
            this.store.dispatch(new AddUserInfo(Object.assign({}, data.user)));
            if (data.success) {
              this.router.navigateByUrl('/lawyer-dashboard')
              this.toasterService.showSuccessToater('Welcome to My Justice Portal.');
            }
            else {
              this.toasterService.showErrorToater(data.error.name);
            }
          })
        }
        else {
          if (res.data === 'Please Enter Your auth code.') {
            this.toasterService.showSuccessToater(res.data);
            this.step = 2;
          }
          else if (res.data === 'Please Register your Mobile Number.') {
            this.toasterService.showSuccessToater(res.data);
            this.step = 3;
          }
          else if (res.data === 'Please complete your registration.') {
            this.toasterService.showWarningToater(res.data);
            // this.step = 4;
          }
          else {
            this.step = 1
            this.toasterService.showWarningToater(res.data);
          }
        }
      })
  }

  onVerify() {
    const loginData = {
      "userName": this.loginForm.get('userName').value,
      "otp": this.loginForm.get('otp').value
    }
    this.lawyerService.verifylawyerLogin(loginData).subscribe((isVerified: any) => {
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
        this.router.navigateByUrl('/lawyer-dashboard')
        this.toasterService.showSuccessToater('Welcome to My Justice Portal.');
      }
      else {
        this.toasterService.showErrorToater(data.error.name);
      }
    })
  }
}