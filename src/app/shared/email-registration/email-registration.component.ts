import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

export class EmailRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  isAcceptDisabled: boolean = true;
  isNextDisabled: boolean = true;

  @Input() roleId;
  @Output() isNextEvent = new EventEmitter()
  @Input() totalSteps: any

  constructor(public securityService: SecurityService, public dialog: MatDialog, private fb: FormBuilder,
    private registrationService: RegistrationService, private store: Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadRole());
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      userName: ['', [Validators.required, this.validateEmail.bind(this)], this.validateUserNotTaken.bind(this)],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      roleId: ['', [Validators.required]],
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

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
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
    const data = {
      "firstName": this.registrationForm.get('firstName').value,
      "middleName": this.registrationForm.get('middleName').value,
      "lastName": this.registrationForm.get('lastName').value,
      "userName": this.registrationForm.get('userName').value,
      "password": this.registrationForm.get('password').value,
      "roleId": this.roleId
    }
    this.registrationService.addUser(data).subscribe((res: any) => {
      this.isNextEvent.emit(res.data.userName)
    })
  }

  onAcceptTerms() {
    this.isNextDisabled = false;
    this.registrationForm.get('termCondition').setValue(true)
  }
}
