import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationService } from 'app/services/registration.service';
import { SecurityService } from 'app/services/security.service';

@Component({
  selector: 'app-email-registration',
  templateUrl: './email-registration.component.html',
  styleUrls: ['./email-registration.component.scss']
})

export class EmailRegistrationComponent implements OnInit, OnChanges {
  registrationForm: FormGroup;
  isAcceptDisabled: boolean = true;
  isNextDisabled: boolean = true;
  public mobileMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  @Input() roleId;
  @Input() totalSteps: any;
  @Input() message: string;
  @Input() email: string;
  @Input() user;
  @Output() isNextEvent = new EventEmitter();

  constructor(public securityService: SecurityService, public dialog: MatDialog,
    private fb: FormBuilder, private registrationService: RegistrationService) {
  }

  ngOnInit(): void {
    if (!this.user) {
      this.createFormControl();
    }
  }

  createFormControl() {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$'), this.validateString.bind(this)]],
      lastName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$'), this.validateString.bind(this)]],
      middleName: [''],
      userName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8), this.validateEmail.bind(this)], this.validateUserNotTaken.bind(this)],
      password: ['', [Validators.required, Validators.minLength(8), this.validatePassword.bind(this)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      termCondition: ['', [Validators.required]],
      mobile: [''],
      userEmail: ['', [Validators.email]],
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') });
  }

  ngOnChanges(): void {
    if (this.email || this.user) {
      this.createFormControl();
    }
    if (this.email) {
      if (this.email == 'EXPIRED_TOKEN') {
        this.registrationForm.reset();
        this.registrationForm.disable();
        this.isNextDisabled = true;
      } else {
        this.registrationForm.get('userName').setValue(this.email);
        this.registrationForm.get('userName').disable();
      }
    }
    if (this.user) {
      this.registrationForm.get('firstName').setValue(this.user.firstName)
      this.registrationForm.get('lastName').setValue(this.user.lastName)
      this.registrationForm.get('middleName').setValue(this.user?.middleName)
      this.registrationForm.get('userName').setValue(this.user?.userName)
      this.registrationForm.get('mobile').setValue(this.user?.mobile)
      this.registrationForm.get('userEmail').setValue(this.user?.email)
      this.registrationForm.get('password').setValue(this.user?.password)
      this.registrationForm.get('confirmPassword').setValue(this.user?.password)
      this.isNextDisabled = false;
    }
  }

  validateEmail(control: AbstractControl) {
    if (this.roleId != 1 && control.value) {
      const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,15})$/;
      if (!control.value.match(pattern) && control.value !== '') {
        return { invalidEmail: true };
      }
      return null;
    }
  }

  validateString(control: AbstractControl) {
    if (control.value) {
      const pattern = /^\S*$/;
      if (!control.value.match(pattern) && control.value !== '') {
        return { invalidString: true };
      }
      return null;
    }
  }

  validatePassword(control: AbstractControl) {
    if (control.value) {
      const pattern = /(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,18}$/;
      if (!control.value.match(pattern) && control.value !== '') {
        return { invalidPassword: true };
      }
      return null;
    }
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
      width: '836px',
    });
  }

  onScroll(event: any) {
    // visible height + pixel scrolled >= total height 
    if (event.target.offsetHeight + event.target.scrollTop + 10 >= event.target.scrollHeight) {
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
      userData.mobile = this.registrationForm.get('mobile').value;
      userData.email = this.registrationForm.get('userEmail').value;
    }
    userData.password = this.registrationForm.get('password').value;
    this.isNextEvent.emit(userData);
  }

  onAcceptTerms() {
    if (this.email == 'EXPIRED_TOKEN') {
      this.registrationForm.get('termCondition').setValue(false);
      this.isNextDisabled = true;
    } else {
      this.registrationForm.get('termCondition').setValue(true);
      this.isNextDisabled = false;
    }
  }

  onDeclineTerms() {
    this.dialog.closeAll();
    this.isNextDisabled = true;
    this.registrationForm.get('termCondition').setValue(false);
  }
}