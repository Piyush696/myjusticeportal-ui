import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SecurityService } from 'app/services/security.service';
import { ToasterService } from 'app/services/toaster.service';
import { RegistrationService } from 'app/services/registration.service';
import { UserMetaService } from 'app/services/user-meta.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})

export class MyAccountComponent implements OnInit {
  user: any;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  securityQuestionForm: FormGroup;
  userId: any;
  securityQuestionList: any[];
  OtpField: boolean;
  isMfa: boolean;
  verifiedIcon: boolean;
  securityQuestionData = [];
  count: number = 0;
  isUser: boolean = false;
  roleId: number;
  userMetaForm: FormGroup;
  userMeta: any;

  constructor(private registrationService: RegistrationService, public dialog: MatDialog,
    private toasterService: ToasterService, private securityService: SecurityService,
    private userService: UserService, private store: Store<any>,
    private fb: FormBuilder, private userMetaService: UserMetaService) { }

  ngOnInit() {
    this.createControl();
    this.getLoginDetails();
    this.securityQuestionControl();
  }

  createControl() {
    this.profileForm = this.fb.group({
      userName: ['', [Validators.required, this.validateEmail.bind(this)], this.validateUserNotTaken.bind(this)],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      isMFA: ['']
    })
    this.userMetaForm = this.fb.group({
      housing_unit: ['', [Validators.required]],
      facility: ['', [Validators.required]]
    })
    this.createPasswordControl();
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

  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  createPasswordControl() {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') })
  }

  securityQuestionControl() {
    this.securityQuestionForm = this.fb.group({
      securityQuestionId: ['', [Validators.required]],
      answer: ['', [Validators.required]],
    })
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

  editChanges() {
    this.userService.updateUserInfo(this.profileForm.value,).subscribe((result: any) => {
      this.toasterService.showSuccessToater('User Updated Successfully.')
      this.getSingleUser();
    })
  }

  userMetaUpdate() {
    if (this.isUser) {
      let meta = this.userMeta
      let formData = this.userMetaForm.value
      for (let item of meta) {
        if (item.metaKey == 'housing_unit') {
          item.metaValue = formData.housing_unit
        }
        if (item.metaKey == 'facility') {
          item.metaValue = formData.facility
        }
      }
      this.userMetaService.updateUserMeta(meta).subscribe((result: any) => {
        this.toasterService.showSuccessToater('User Updated Successfully.')
        this.getSingleUser();
      })
    }
  }

  getLoginDetails() {
    this.store.select(s => s.userInfo).subscribe(x => {
      this.getSingleUser();
    })
  }

  getAllSecurityQuestion(roleId?) {
    this.securityService.getAllSecurityRoles(roleId).subscribe((questions: any) => {
      this.securityQuestionList = questions.data
    })
  }

  getSingleUser() {
    this.userService.getSingleUser().subscribe((result: any) => {
      this.roleId = result.data.roles[0].roleId;
      if (result.data.roles[0].name == 'User') {
        this.isUser = true
      } else {
        this.isUser = false
      }
      result.data.roles.forEach(element => {
        this.getAllSecurityQuestion(element.roleId)
      });
      this.user = result.data;
      this.userMeta = result.data.userMeta
      this.profileForm.get('firstName').setValue(result.data.firstName)
      this.profileForm.get('middleName').setValue(result.data.middleName)
      this.profileForm.get('lastName').setValue(result.data.lastName)
      this.profileForm.get('userName').setValue(result.data.userName)
      this.profileForm.get('isMFA').setValue(result.data.isMFA)
      if (result.data.userMeta.length) {
        this.userMetaForm.get('housing_unit').setValue(result.data.userMeta[0].metaValue);
        this.userMetaForm.get('facility').setValue(result.data.userMeta[1].metaValue);
      }
      this.profileForm.get('firstName').disable();
      this.profileForm.get('middleName').disable();
      this.profileForm.get('lastName').disable();
    })
  }

  passwordChange() {
    this.userService.resetPassword({ oldPassword: this.passwordForm.get('oldPassword').value, password: this.passwordForm.get('password').value }).subscribe((reset: any) => {
      if (reset.success) {
        this.toasterService.showSuccessToater('Password Reset Successfully.');
        this.closeModal();
      } else {
        this.toasterService.showErrorToater('Current Password is Incorrect');
        this.closeModal();
      }
      this.passwordForm.reset()
    })
  }

  onSaveChanges() {
    const data = {
      "securityQuestionId": parseInt(this.securityQuestionForm.get('securityQuestionId').value),
      "answer": this.securityQuestionForm.get('answer').value
    }
    this.securityQuestionData.push(data)
    this.securityQuestionList = this.securityQuestionList.filter(filteredquestion => filteredquestion.securityQuestionId != parseInt(this.securityQuestionForm.get('securityQuestionId').value))
    this.securityQuestionForm.get('answer').reset();
    this.count = this.count + 1;
    if (this.count === 3) {
      this.securityService.updateSecurityQuestionAnswer(this.securityQuestionData).subscribe((data: any) => {
        if (data.success) {
          this.closeModal();
          this.toasterService.showSuccessToater('Security Question Updated Successfully.')
          this.securityQuestionForm.reset()
        }
        else {
          this.toasterService.showErrorToater('Security Question not Updated.')
        }
      })
    }
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

  onMfaSelect() {
    this.userService.updateUser({ isMFA: this.profileForm.get('isMFA').value }).subscribe((isMFA: any) => {
      if (isMFA.success) {
        this.toasterService.showSuccessToater('Success');
      }
    })
  }
}