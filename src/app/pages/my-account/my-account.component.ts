import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
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
  userId: any;

  constructor(private toasterService: ToasterService, private userService: UserService, private store: Store<any>, private fb: FormBuilder) { }

  ngOnInit() {
    this.createControl();
    this.getLoginDetails();
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
}
