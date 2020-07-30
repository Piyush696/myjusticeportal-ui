import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CacheService } from 'app/services/cache.service';
import { LoginService } from 'app/services/login.service';
import { ToastrService } from "ngx-toastr";
import { Store } from '@ngrx/store';
import { AddUserInfo } from 'app/store/actions/userInfo.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private store: Store<any>,
    private loginService: LoginService, private toastr: ToastrService, private cacheService: CacheService) { }

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
            console.log(data)
            this.store.dispatch(new AddUserInfo(Object.assign({}, data.user)));
            if (data.success) {
              this.router.navigateByUrl('/dashboard')
              this.showNotification('top', 'right', 'success');
            }
            else {
              this.showNotification('top', 'right', 'error');
            }
          })
        }
      })
  }


  showNotification(from, align, value) {
    if (value === 'success') {
      this.toastr.success(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>My Justice Portal</b> - .</span>',
        "",
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-info alert-with-icon",
          positionClass: "toast-" + from + "-" + align
        }
      );
    }
    else {
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>User not Registered</b> - .</span>',
        "",
        {
          timeOut: 4000,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: "toast-" + from + "-" + align
        }
      );
    }
  }
}
