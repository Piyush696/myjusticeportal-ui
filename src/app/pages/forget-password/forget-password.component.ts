import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'app/services/security.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  passwordResetForm: FormGroup;
  step: number = 1;
  securityQuestions: any;

  constructor(private fb: FormBuilder, private router: Router, private securityService: SecurityService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.createFormControl();
  }

  createFormControl() {
    this.passwordResetForm = this.fb.group({
      user: ['', [Validators.required]],
      securityQuestionId: ['', [Validators.required]],
      answer: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') });
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

  getAllUserSecurityQuestions() {
    this.securityService.getUserSecurityQuestions(this.passwordResetForm.get('user').value).subscribe((securityQuestions: any) => {
      if (securityQuestions.data) {
        this.securityQuestions = securityQuestions.data.securityQuestions
        this.step = 2;
      }
      else {
        this.toasterService.showSuccessToater('Reset Password Link sent')
      }
    })
  }

  onSelectQuestion() {
    const data = {
      "user": this.passwordResetForm.get('user').value,
      "answer": this.passwordResetForm.get('answer').value,
      "securityQuestionId": this.passwordResetForm.get('securityQuestionId').value,
    }
    this.securityService.checkAnswer(data).subscribe((res: any) => {
      if (res.match === true) {
        this.toasterService.showSuccessToater('Security Question and Answer Matched.')
        this.securityQuestions = this.securityQuestions.filter(filteredquestion => filteredquestion.securityQuestionId != parseInt(this.passwordResetForm.get('securityQuestionId').value))
        this.passwordResetForm.get('answer').reset();
        if (!this.securityQuestions.length) {
          this.step = 3;
        }
        else {
          this.step = 2;
        }
      }
      else {
        this.toasterService.showErrorToater('Security Question and Answer did not Matched.')
      }
    })
  }

  resetPassword() {
    const data = {
      "user": this.passwordResetForm.get('user').value,
      "password": this.passwordResetForm.get('password').value
    }
    this.securityService.resetPassword(data).subscribe((res: any) => {
      if (res.success) {
        this.toasterService.showSuccessToater('Password Reset Successfully.')
        this.router.navigateByUrl('/login')
      }
    })
  }
}
