import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SecurityService } from 'app/services/security.service';
import { ToasterService } from 'app/services/toaster.service';
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

  constructor(private toasterService: ToasterService, private securityService: SecurityService, private userService: UserService, private store: Store<any>, private fb: FormBuilder) { }

  ngOnInit() {
    this.createControl();
    this.getLoginDetails();
    this.securityQuestionControl();
    this.getAllSecurityQuestion()
  }

  createControl() {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
    })
    this.createPasswordControl();
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
  getAllSecurityQuestion() {
    this.securityService.getUserSecurityQuestion().subscribe((questions: any) => {
      this.securityQuestionList = questions.data
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


  getSingleUser() {
    this.userService.getSingleUser().subscribe((result: any) => {
      this.user = result.data;
      this.profileForm.get('firstName').setValue(result.data.firstName)
      this.profileForm.get('lastName').setValue(result.data.lastName)
      this.profileForm.get('username').setValue(result.data.username)
      this.profileForm.get('email').setValue(result.data.email)
    })
  }

  passwordChange() {
    this.userService.resetPassword(this.passwordForm.get('password').value).subscribe((reset: any) => {
      if (reset.success) {
        this.toasterService.showSuccessToater('Password Reset Successfully.');
      }
    })
  }

  onSelectQuestions(securityQuestionId) {
    this.securityQuestionList.filter(data => {
      if (data.securityQuestionId == securityQuestionId) {
        this.securityQuestionForm.get('answer').setValue(data.answer)
        this.securityQuestionForm.get('answer').disable()
      }
    })
  }

  onSaveChanges() {
    const data = {
      "securityQuestionId": this.securityQuestionForm.get('securityQuestionId').value,
      "answer": this.securityQuestionForm.get('answer').value
    }
    this.securityService.updateSecurityQuestionAnswer(data).subscribe((data: any) => {
      if (data.data) {
        this.getAllSecurityQuestion()
        this.toasterService.showSuccessToater('Security Question Updated Successfully.')
        this.securityQuestionForm.reset()
      }
      else {
        this.toasterService.showErrorToater('Security Question not Updated.')
      }
    })
  }
}
