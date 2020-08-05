import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private userService: UserService, private store: Store<any>, private fb: FormBuilder, private toastr: ToastrService) { }

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
    this.profileForm.enable();
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
      this.profileForm.disable();
    })
  }

  passwordChange() {
    this.userService.resetPassword(this.passwordForm.get('password').value).subscribe((reset: any) => {
      if (reset.success) {
        this.showNotification('top', 'right', 'success');
      }
    })
  }

  showNotification(from, align, value) {
    if (value === 'success') {
      this.toastr.success(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Password Reset Successfully</b> - .</span>',
        "",
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-info alert-with-icon",
          positionClass: "toast-" + from + "-" + align
        }
      );
    }
    else {
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>User not Registered</b> - .</span>',
        "",
        {
          timeOut: 4000,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: "toast-" + from + "-" + align
        }
      );
    }
  }
}
