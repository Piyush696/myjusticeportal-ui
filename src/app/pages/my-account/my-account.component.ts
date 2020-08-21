import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SecurityService } from 'app/services/security.service';
import { ToasterService } from 'app/services/toaster.service';
import { TwilioService } from 'app/services/twilio.service';
import { UserService } from '../../services/user.service';

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


  constructor(public dialog: MatDialog, private twilioService: TwilioService, private toasterService: ToasterService, private securityService: SecurityService, private userService: UserService, private store: Store<any>, private fb: FormBuilder) { }

  ngOnInit() {
    this.createControl();
    this.getLoginDetails();
    this.securityQuestionControl();
    // this.getAllSecurityQuestion()
  }

  createControl() {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      countryCode: ['', [Validators.required]],
      otp: ['', [Validators.required]],
      isMFA: [''],
    })
    this.createPasswordControl();
  }

  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  createPasswordControl() {
    this.passwordForm = this.fb.group({
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
    this.userService.updateUser(this.profileForm.value).subscribe((result: any) => {
      this.toasterService.showSuccessToater('User Updated Successfully.')
      this.getSingleUser();
    })
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
      result.data.roles.forEach(element => {
        this.getAllSecurityQuestion(element.roleId)
      });
      this.user = result.data;
      this.profileForm.get('firstName').setValue(result.data.firstName)
      this.profileForm.get('lastName').setValue(result.data.lastName)
      this.profileForm.get('username').setValue(result.data.username)
      this.profileForm.get('email').setValue(result.data.email)
      this.profileForm.get('countryCode').setValue(result.data.countryCode)
      this.profileForm.get('mobile').setValue(result.data.mobile)
      this.profileForm.get('isMFA').setValue(result.data.isMFA)

    })
  }

  passwordChange() {
    this.userService.resetPassword(this.passwordForm.get('password').value).subscribe((reset: any) => {
      if (reset.success) {
        this.toasterService.showSuccessToater('Password Reset Successfully.');
        this.closeModal();
      }
    })
  }

  onSaveChanges() {
    const data = {
      "securityQuestionId": this.securityQuestionForm.get('securityQuestionId').value,
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
  onGetOtp() {
    const data = {
      "mobile": this.profileForm.get('mobile').value,
      "countryCode": this.profileForm.get('countryCode').value,
      "email": this.profileForm.get('email').value
    }
    this.twilioService.getOtp(data).subscribe((otp: any) => {
      if (otp.success) {
        this.OtpField = true;
        this.toasterService.showSuccessToater('Please submit your otp.')
      }
      else {
        this.OtpField = false;
      }
    })
  }

  onVerifySms() {
    this.twilioService.verifyCode({ otp: this.profileForm.get('otp').value }).subscribe((verifyData: any) => {
      if (verifyData.success) {
        this.OtpField = false;
        this.verifiedIcon = true;
        this.getSingleUser();
        this.toasterService.showSuccessToater('Verified.')
      }
    })
  }

  onMfaSelect() {
    this.userService.updateUser({ isMFA: this.profileForm.get('isMFA').value }).subscribe((isMFA: any) => {
      if (isMFA.success) {
        this.toasterService.showSuccessToater('Success')
      }
    })
  }
}
