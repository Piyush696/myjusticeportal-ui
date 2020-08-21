import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CacheService } from 'app/services/cache.service';
import { LoginService } from 'app/services/login.service';
import { Store } from '@ngrx/store';
import { AddUserInfo } from 'app/store/actions/userInfo.actions';
import { ToasterService } from 'app/services/toaster.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private store: Store<any>,
    private loginService: LoginService, private toasterService: ToasterService, private cacheService: CacheService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  onLogin() {
    this.loginService.userLogin(
      this.loginForm.get('user').value,
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
        else {
          this.toasterService.showErrorToater(res.error.name);
        }
      })
  }
}
