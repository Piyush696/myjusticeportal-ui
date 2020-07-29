import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'app/services/registration.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  constructor(private fb: FormBuilder, private toastr: ToastrService, private registrationService: RegistrationService, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [''],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      username: ['', [Validators.required]],
    })
  }

  onRegister() {
    console.log(this.registrationForm.value)
    this.registrationService.addUser(this.registrationForm.value).subscribe((result) => {
      this.showNotification('top', 'right', 'success');
      this.router.navigateByUrl('/dashboard')
      console.log(result)
    })
  }

  showNotification(from, align, value) {
    if (value === 'success') {
      console.log('xsax')
      this.toastr.success(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>My Justice Portal</b> - .</span>',
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
      console.log('xsax')
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>My Justice Portal</b> - .</span>',
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
