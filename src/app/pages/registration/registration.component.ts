import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CacheService } from 'app/services/cache.service';
import { LoginService } from 'app/services/login.service';
import { RegistrationService } from 'app/services/registration.service';
import { RoleService } from 'app/services/role.service';
import { Store } from '@ngrx/store';
import { AddRole, LoadRole } from 'app/store/actions/role.actions';
import { ToasterService } from 'app/services/toaster.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  step: number = 1;
  roleList: any;

  constructor(public dialog: MatDialog, private loginService: LoginService, private cacheService: CacheService, private fb: FormBuilder,
    private toasterService: ToasterService, private roleService: RoleService,
    private registrationService: RegistrationService, private router: Router, private store: Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadRole());

    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [this.validateEmail.bind(this)], this.validateUserNotTaken.bind(this)],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required], this.validateUserNotTaken.bind(this)],
      roleId: ['', [Validators.required]]
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') });
    this.onGetRoles();
  }

  async validateUserNotTaken(control: AbstractControl) {
    const result: any = await this.registrationService.checkUser({ user: control.value }).toPromise();
    if (result.taken) {
      return { taken: true };
    } else {
      return null;
    }
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notSamePassword: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }


  onGetRoles() {
    this.store.select(s => s.role).subscribe(data => {
      this.roleList = data;
    })
  }

  validateEmail(control: AbstractControl) {
    const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,15})$/;
    if (!control.value.match(pattern) && control.value !== '') {
      return { invalidEmail: true };
    }
    return null;
  }

  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onRegister() {
    this.registrationService.addUser(this.registrationForm.value).subscribe((res: any) => {
      this.cacheService.setCache('token', res.token);
      this.loginService.checkToken().then((data: any) => {
        this.toasterService.showSuccessToater('>Welcome to My Justice Portal.')
        this.router.navigateByUrl('/dashboard')
      })
    })
  }
}
