import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  questionCount: number = 0;
  securityQuestions = [];
  isSentMail: boolean = false;
  securityQuestionsList: any;

  constructor(private fb: FormBuilder, private router: Router,
    private securityService: SecurityService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.createFormControl();
  }

  createFormControl() {
    this.passwordResetForm = this.fb.group({
      userName: ['', [Validators.required]],
      // securityQuestionId: ['', [Validators.required]],
      answer: ['', [Validators.required]],
      password: ['',[Validators.required, Validators.minLength(8), this.validatePassword.bind(this)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') });
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
    this.isSentMail = true;
    this.securityService.getUserSecurityQuestions(this.passwordResetForm.get('userName').value).subscribe((res: any) => {
      if (res.data == 'Invalid input') {
        this.toasterService.showErrorToater("We don't recognize your entry. Please try again.");
      }
      else if (res.data == 'Mail sent' || res.data == 'Mail not sent') { // for other.
        this.toasterService.showSuccessToater('Your password reset link has been sent to ' + this.passwordResetForm.get('userName').value +
          ', if did not received the email please wait sometime and try again');
      } else { // for user.
        this.securityQuestions = res.data.securityQuestions
        this.step = 2;
      }
    })
  }

  onSelectQuestion() {
    const data = {
      "userName": this.passwordResetForm.get('userName').value,
      "answer": this.passwordResetForm.get('answer').value,
      "securityQuestionId": this.securityQuestions[this.questionCount].securityQuestionId,
    }
    this.securityService.checkAnswer(data).subscribe((res: any) => {
      if (res.match === true) {
        this.toasterService.showSuccessToater('Security Question and Answer Matched.')
        this.questionCount++
        this.passwordResetForm.get('answer').reset();
        if (this.questionCount === 3) {
          this.step = 3;
        }
        else {
          this.step = 2;
        }
      }
      else {
        this.toasterService.showErrorToater('Your answer doesnot match our records.')
      }
    })
  }

  resetPassword() {
    const data = {
      "userName": this.passwordResetForm.get('userName').value,
      "password": this.passwordResetForm.get('password').value
    }
    this.securityService.resetPassword(data).subscribe((res: any) => {
      if (res.success) {
        this.toasterService.showSuccessToater('Password Reset Successfully.');
        this.router.navigateByUrl('/login');
      }
    })
  }
}