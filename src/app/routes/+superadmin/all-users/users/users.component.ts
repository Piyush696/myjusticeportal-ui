import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToasterService } from 'app/services/toaster.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from 'app/services/registration.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit, OnDestroy {
  userInfo: any;
  userInfoStoreSub: Subscription;
  createUserForm: FormGroup;

  displayedColumns: string[] = ["name", "userName", "status", "roles", "createdAt", "action"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  user: any;
  filterStatus: any;

  
  constructor(private userService: UserService, private store: Store<any>,
    private toasterService: ToasterService, private registrationService: RegistrationService, private fb: FormBuilder, public dialog: MatDialog) { 
    }

  ngOnInit(): void {
    this.onGetAllUsers();
    this.onGetUserInfo();
    this.createUserControl();
  }


  onViewRejectedUsers(e) {
    if (e) {
      this.userService.getUsers().subscribe((res: any) => {
        if (res.data) {
          this.filterStatus = res.data.filter((res) => {
            if (res.status == false) {
              return res;
            }
          });
        }
        this.dataSource = new MatTableDataSource(this.filterStatus);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    } else {
      this.onGetAllUsers();
    }
  }

  createUserControl() {
    this.createUserForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      middleName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      lastName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      userName: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(8)], this.validateUserNotTaken.bind(this)],
      password: ['', [Validators.required, Validators.minLength(8), this.validatePassword.bind(this)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
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

  validatePassword(control: AbstractControl) {
    const pattern = /(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,18}$/;
    if (!control.value.match(pattern) && control.value !== '') {
      return { invalidPassword: true };
    }
    return null;
  }

  async validateUserNotTaken(control: AbstractControl) {
    const result: any = await this.registrationService.checkUser({ userName: control.value }).toPromise();
    if (result.taken) {
      return { taken: true };
    } else {
      return null;
    }
  }

  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '368px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  onGetUserInfo() {
    this.userInfoStoreSub = this.store.select(s => s.userInfo).subscribe(data => this.userInfo = data);
  }

  onGetAllUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      let x = res.data.map((element) => {
        if (element.status == true) {
          element.status = 'Active'
        } else {
          element.status = 'Pending'
        }
        return element
      })
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sortingDataAccessor = (item: any, property) => {
        switch (property) {
          case 'name': if (item) return item.firstName + item.middleName + item.lastName;
          case 'roles': if (item) return item.roles[0].name;
          default: return item[property];
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  onDeleteUser() {
    if (this.user.userId != this.userInfo.userId) {
      this.userService.deleteUser(this.user.userId).subscribe((res: any) => {
        if (res.success) {
          this.toasterService.showSuccessToater('User(' + this.user.firstName + ' ' + this.user.lastName + ') successfully deleted.');
          this.onGetAllUsers();
          this.dialog.closeAll();
        } else {
          this.dialog.closeAll();
          this.toasterService.showErrorToater('User(' + this.user.firstName + ' ' + this.user.lastName + ') is not deleted.');
        }
      });
    } else {
      this.dialog.closeAll();
      this.toasterService.showErrorToater('You can not delete yourself. You are logged in.');
    }
  }

  search(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (searchValue: any, filter) => {
      const dataStr =JSON.stringify(searchValue).toLowerCase();
      return dataStr.indexOf(filter) != -1; 
    }
  }

  // pagination.
  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length > 500)
      return [10, 50, 100, 500, this.dataSource.paginator?.length];
    else if (this.dataSource.data.length > 100) {
      return [10, 50, 100, this.dataSource.paginator?.length];
    }
    else if (this.dataSource.data.length > 50) {
      return [10, 50, this.dataSource.paginator?.length];
    }
    else if (this.dataSource.data.length > 10) {
      return [10, this.dataSource.paginator?.length];
    }
    else {
      return [10];
    }
  }

  onOpenModal(templateRef, user) {
    this.user = user
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnDestroy(): void {
    this.userInfoStoreSub.unsubscribe();
  }

  closeModal() {
    this.dialog.closeAll()
  }

  onCreateUser() {
    const userData = {
      "firstName": this.createUserForm.get('firstName').value,
      "middleName": this.createUserForm.get('middleName').value,
      "lastName": this.createUserForm.get('lastName').value,
      "userName": this.createUserForm.get('userName').value,
      "password": this.createUserForm.get('password').value
    }
    this.userService.addUser(userData).subscribe((user: any) => {
      if (user.success) {
        this.dialog.closeAll();
        this.toasterService.showSuccessToater('User created.')
      }
      else {
        this.toasterService.showErrorToater('User not created.')
      }
    })
  }
}