import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { RegistrationService } from 'app/services/registration.service';
import { SecurityService } from 'app/services/security.service';
import { LoadRole } from 'app/store/actions/role.actions';

@Component({
  selector: 'app-email-registration',
  templateUrl: './email-registration.component.html',
  styleUrls: ['./email-registration.component.scss']
})

export class EmailRegistrationComponent implements OnInit, OnChanges {
  registrationForm: FormGroup;
  isAcceptDisabled: boolean = true;
  isNextDisabled: boolean = true;

  @Input() roleId;
  @Input() totalSteps: any;
  @Input() message: string;
  @Input() email: string;
  @Output() isNextEvent = new EventEmitter();

  constructor(public securityService: SecurityService, public dialog: MatDialog, private fb: FormBuilder,
    private registrationService: RegistrationService, private store: Store<any>) {
  }

  ngOnChanges(): void {
    if (this.email) {
      this.ngOnInit();
      this.registrationForm.get('userName').setValue(this.email);
      this.registrationForm.get('userName').disable();
    }
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadRole());
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      lastName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      middleName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      userName: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(8), this.validateEmail.bind(this)], this.validateUserNotTaken.bind(this)],
      password: ['', [Validators.required, Validators.minLength(8), this.validatePassword.bind(this)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      termCondition: ['', [Validators.required]]
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') });
  }

  validateEmail(control: AbstractControl) {
    if (this.roleId != 1) {
      const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,15})$/;
      if (!control.value.match(pattern) && control.value !== '') {
        return { invalidEmail: true };
      }
      return null;
    }
  }

  validatePassword(control: AbstractControl) {
    const pattern = /(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,18}$/;
    if (!control.value.match(pattern) && control.value !== '') {
      return { invalidPassword: true };
    }
    return null;
  }

  async validateUserNotTaken(control: AbstractControl) {
    const result: any = await this.registrationService.checkUser({ userName: control.value }).toPromise();
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

  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
    });
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

  onNextClick() {
    let userData: any = {};
    userData.firstName = this.registrationForm.get('firstName').value;
    userData.middleName = this.registrationForm.get('middleName').value;
    userData.lastName = this.registrationForm.get('lastName').value;
    if (this.email) {
      userData.userName = this.email;
    } else {
      userData.userName = this.registrationForm.get('userName').value;
    }
    userData.password = this.registrationForm.get('password').value;
    this.isNextEvent.emit(userData);
  }

  onAcceptTerms() {
    this.registrationForm.get('termCondition').setValue(true);
    this.isNextDisabled = false;
  }

  onDeclineTerms() {
    this.dialog.closeAll();
    this.isNextDisabled = true;
    this.registrationForm.get('termCondition').setValue(false);
  }
}