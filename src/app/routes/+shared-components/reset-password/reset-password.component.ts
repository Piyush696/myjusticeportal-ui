import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from 'app/services/security.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
    private router: Router, private securityService: SecurityService,
    private toasterService: ToasterService) {
    this.token = this.activatedRoute.snapshot.params.token;
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
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

  onSavePassword() {
    let data: any = {};
    data.password = this.resetPasswordForm.get('password').value;
    data.token = this.token;

    this.securityService.onResetPassword(data).subscribe((res: any) => {
      if (res.success) {
        this.resetPasswordForm.reset();
        this.toasterService.showSuccessToater('Password successfully reset.');
        this.router.navigateByUrl('/login');
      }
    })
  }
}