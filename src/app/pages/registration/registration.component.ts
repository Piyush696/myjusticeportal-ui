import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CacheService } from 'app/services/cache.service';
import { LoginService } from 'app/services/login.service';
import { RegistrationService } from 'app/services/registration.service';
import { RoleService } from 'app/services/role.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AddRole, LoadRole } from 'app/store/actions/role.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  step: number = 1;
  roleList: any;

  constructor(private loginService: LoginService, private cacheService: CacheService, private fb: FormBuilder,
    private toastr: ToastrService, private roleService: RoleService,
    private registrationService: RegistrationService, private router: Router, private store: Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadRole());

    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, this.validateEmail.bind(this)]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      username: ['', [Validators.required]],
      roleId: ['', [Validators.required]]
    })
    this.onGetRoles();
  }

  onGetRoles() {
    this.store.select(s => s.role).subscribe(data => {
      this.roleList = data;
    })
  }

  validateEmail(control: AbstractControl) {
    const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,15})$/;
    if (!control.value.match(pattern)) {
      return { invalidEmail: true };
    }
    return null;
  }

  onRegister() {
    this.registrationService.addUser(this.registrationForm.value).subscribe((res: any) => {
      this.cacheService.setCache('token', res.token);
      this.loginService.checkToken().then((data: any) => {
        this.showNotification('top', 'right', 'success');
        this.router.navigateByUrl('/dashboard')
      })
    })
  }

  showNotification(from, align, value) {
    if (value === 'success') {
      this.toastr.success(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>My Justice Portal</b></span>',
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
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Error</b></span>',
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
