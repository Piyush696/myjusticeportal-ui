import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SecurityService } from 'app/services/security.service';
import { ToasterService } from 'app/services/toaster.service';
import { RegistrationService } from 'app/services/registration.service';
import { UserMetaService } from 'app/services/user-meta.service';
import { UserService } from 'app/services/user.service';
import { FacilityService } from 'app/services/registration/facility.service';
import { Location } from '@angular/common';

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
  addedSecurityQuestionList: any[];
  OtpField: boolean;
  isMfa: boolean;
  verifiedIcon: boolean;
  securityQuestionData = [];
  count: number = 0;
  isUser: boolean = false;
  roleId: number;
  userMetaForm: FormGroup;
  userMeta: any;
  buttonText: string = 'Edit'
  previousSecurityId: any;
  facilityList: any;
  isDisabled: boolean = true;


  constructor(private registrationService: RegistrationService, public dialog: MatDialog,
    private toasterService: ToasterService, private securityService: SecurityService,
    private userService: UserService, private store: Store<any>, private facilityService: FacilityService,
    private fb: FormBuilder, private userMetaService: UserMetaService, private location: Location) { }

  ngOnInit() {
    this.createControl();
    this.getLoginDetails();
    this.securityQuestionControl();
    this.getAddUserSecurityQuestion();
    this.getAllFacilities();
    this.getSingleUser();
  }

  onClick() {
    this.location.back();
  }

  createControl() {
    this.profileForm = this.fb.group({
      userName: ['', [Validators.required, this.validateEmail.bind(this)], this.validateUserNotTaken.bind(this)],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: [''],
      isMFA: [''],
      userEmail: [''],
      mobile: ['']
    })
    this.userMetaForm = this.fb.group({
      housing_unit: [''],
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
    if (this.profileForm.get('userName').value != this.user.userName) {
      const result: any = await this.registrationService.checkUser({ userName: control.value }).toPromise();
      if (result.taken) {
        return { taken: true };
      } else {
        return null;
      }
    }
  }

  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openQuestionModal(templateRef, value) {
    this.previousSecurityId = value.securityQuestionId
    let dialogRef = this.dialog.open(templateRef, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
    this.securityQuestionForm.get('securityQuestionId').setValue(value.securityQuestionId)
    this.securityQuestionForm.get('answer').setValue(value.answer)
  }

  createPasswordControl() {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), this.validatePassword.bind(this)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') })
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

  securityQuestionControl() {
    this.securityQuestionForm = this.fb.group({
      securityQuestionId: ['', [Validators.required]],
      answer: ['', [Validators.required, this.noWhitespaceValidator.bind(this)]],
    })
  }

  noWhitespaceValidator(control: AbstractControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
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
    if (this.buttonText === 'Save') {
      this.buttonText = 'Edit';
      this.userMetaUpdate()
      this.userService.updateUserInfo(this.profileForm.value).subscribe((result: any) => {
        // this.toasterService.showSuccessToater('User Updated Successfully.')
        this.buttonText = 'Edit';
        this.isDisabled = true;
        this.getSingleUser();
      })
    }
    this.buttonText = 'Save';
    this.profileForm.get('userName').enable()
    this.profileForm.get('userEmail').enable()
    this.profileForm.get('mobile').enable()
    this.profileForm.get('userName').enable()
    this.profileForm.get('firstName').enable()
    this.profileForm.get('lastName').enable()
    this.userMetaForm.get('housing_unit').enable()
    this.profileForm.get('middleName').enable()
    this.isDisabled = false;
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

  getAddUserSecurityQuestion() {
    this.securityService.getUpdateUserSecurityQuestion().subscribe((questions: any) => {
      this.addedSecurityQuestionList = questions.data
    })
  }

  getSingleUser() {
    this.userService.getSingleUser().subscribe((result: any) => {
      console.log(result)
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
      let mobileNo  = (result.data.mobile).replace(/[^0-9 ]/g, " ").replace(/\s/g,'')
      this.profileForm.get('mobile').setValue(Number((mobileNo)))
      
      this.profileForm.get('userEmail').setValue(result.data.email)
      this.profileForm.get('isMFA').setValue(result.data.isMFA)
      if (result.data.facilities.length > 0) {
        this.userMetaForm.get('facility').setValue(result.data.facilities[0]?.facilityName);
        this.userMetaForm.disable()
      }
      if (result.data.userMeta.length) {
        this.userMetaForm.get('housing_unit').setValue(result.data.userMeta[0]?.metaValue);
        this.userMetaForm.disable()
      }
      this.profileForm.get('userName').disable()
      this.profileForm.get('firstName').disable();
      this.profileForm.get('middleName').disable();
      this.profileForm.get('lastName').disable();
      this.profileForm.get('userEmail').disable();
      this.profileForm.get('mobile').disable();
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
      "answer": this.securityQuestionForm.get('answer').value,
      "previousSecurityId": parseInt(this.previousSecurityId)
    }
    this.securityQuestionData.push(data)
    this.securityQuestionList = this.securityQuestionList.filter(filteredquestion => filteredquestion.securityQuestionId != parseInt(this.securityQuestionForm.get('securityQuestionId').value))
    this.securityQuestionForm.get('answer').reset();
    this.securityService.updateSecurityQuestion(data).subscribe((data: any) => {
      if (data) {
        this.getAddUserSecurityQuestion();
        this.getSingleUser()
        this.toasterService.showSuccessToater('Security Question Updated Successfully.')
        this.securityQuestionForm.reset()
        this.closeModal();
      } else {
        this.toasterService.showWarningToater('Security Question not Updated Successfully.')
      }
    })
  }

  closeModal(): void {
    this.dialog.closeAll()
  }

  onMfaSelect() {
    this.userService.updateUser({ isMFA: this.profileForm.get('isMFA').value }).subscribe((isMFA: any) => {
      if (isMFA.success) {
        this.toasterService.showSuccessToater('Success');
      }
    })
  }

  getAllFacilities() {
    this.facilityService.getAllFacility().subscribe((res: any) => {
      this.facilityList = res.data
    })
  }

}