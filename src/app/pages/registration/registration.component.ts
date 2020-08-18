import { Component, HostListener, OnInit } from '@angular/core';
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
import { SecurityService } from 'app/services/security.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
@HostListener('scroll', ['$event'])
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  step: number = 1;
  roleList: any;
  securityQuestions: any;
  securityQuestionId: number;
  selectedRoleId: number;
  isAcceptDisabled: boolean = true;
  isNextDisabled: boolean = true;

  constructor(public securityService: SecurityService, public dialog: MatDialog, private loginService: LoginService, private cacheService: CacheService, private fb: FormBuilder,
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
      roleId: ['', [Validators.required]],
      termCondition: ['', [Validators.required]]
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

  onSelectRole(roleId) {
    this.selectedRoleId = roleId
  }

  onSelectQuestion(questionId) {
    this.securityQuestionId = questionId
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

  onCreateRegisterUser() {
    this.registrationService.addUser(this.registrationForm.value).subscribe((res: any) => {
      this.cacheService.setCache('token', res.token);
      this.loginService.checkToken().then((data: any) => {
        this.step = 3;
      })
    })
  }

  onUpdateRegisteredUser(value: boolean) {
    this.registrationService.updateUser(value).subscribe((user: any) => {
      this.toasterService.showSuccessToater('Welcome to My Justice Portal.')
      this.router.navigateByUrl('/dashboard')
    })
  }


  onScroll(event: any) {
    // visible height + pixel scrolled >= total height 
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.isAcceptDisabled = false;
    }
    else {
      this.isAcceptDisabled = true;
    }
  }

  onAcceptTerms() {
    this.isNextDisabled = false;
    this.registrationForm.get('termCondition').setValue(true)
  }

}
