import { Component, OnInit } from '@angular/core';
import { CacheService } from 'app/services/cache.service';
import { LoginService } from 'app/services/login.service';
import { RegistrationService } from 'app/services/registration.service';
import { Store } from '@ngrx/store';
import { AddUserInfo } from 'app/store/actions/userInfo.actions';
import { ToasterService } from 'app/services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-defender-registration',
  templateUrl: './public-defender-registration.component.html',
  styleUrls: ['./public-defender-registration.component.css']
})
export class PublicDefenderRegistrationComponent implements OnInit {

  step: number = 1;
  roleId: number = 5;
  userName;
  totalSteps: number = 2;

  constructor(private store: Store<any>, private router: Router, private toaterService: ToasterService, private loginService: LoginService, private registrationService: RegistrationService, private cacheService: CacheService) { }

  ngOnInit(): void {
  }

  onNextClick(value) {
    if (value) {
      this.userName = value;
      this.step = 2;
    }
    else {
      this.step = 1;
    }
  }

  onUpdateRegisteredUser(data) {
    const value = {
      "status": true,
      "userName": this.userName
    }
    this.registrationService.updateUser(value).subscribe((user: any) => {
      this.cacheService.setCache('token', user.token);
      this.loginService.checkToken().then((data: any) => {
        if (data.success) {
          this.store.dispatch(new AddUserInfo(Object.assign({}, data.user)));
          this.toaterService.showSuccessToater('Welcome to My Justice Portal.')
          this.router.navigateByUrl('/dashboard')
        }
      })
    })
  }

}
