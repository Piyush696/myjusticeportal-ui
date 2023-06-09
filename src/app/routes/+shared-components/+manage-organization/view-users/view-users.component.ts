import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OrganisationService } from 'app/services/organisation.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToasterService } from 'app/services/toaster.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'app/services/user.service';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})

export class ViewUsersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ["name", "userName", "roles", 'mobile', "createdAt", "action"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  editUserForm: FormGroup;
  userId: any;
  buttonText: string = 'Edit';
  constructor(private location: Location, public dialog: MatDialog, private fb: FormBuilder,
    private organisationService: OrganisationService, private userService: UserService, private toasterService: ToasterService,) { }

  ngOnInit(): void {
    this.createControl();
    this.getAllUsers();
  }

  onDeleteInvitedUser() {
    this.organisationService.deleteInvitedUser(this.userId).subscribe((res: any) => {
      if (res.success) {
        this.toasterService.showSuccessToater('User deleted')
        this.getAllUsers();
        this.dialog.closeAll();
      }
    })
  }

  createControl() {
    this.editUserForm = this.fb.group({
      email: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      mobile: [''],
      isAdmin: ['']
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onAdminSelect() {
    this.userService.updateAdmin({ isAdmin: this.editUserForm.get('isAdmin').value, userId: this.userId }).subscribe((isAdmin: any) => {
      if (isAdmin.success) {
        this.dialog.closeAll();
        this.toasterService.showSuccessToater('Success');
        this.getAllUsers();
      }
    })
  }

  onSaveChanges() {
    if (this.buttonText === 'Edit') {
      this.editUserForm.enable();
      this.buttonText = 'Save'
    }
    else if (this.buttonText === 'Save') {
      this.buttonText = 'Edit';
      this.editUserForm.value['userId'] = this.userId;
      this.organisationService.updateUserOrg(this.editUserForm.value).subscribe((res: any) => {
        if (res.success) {
          this.toasterService.showSuccessToater('User updated')
          this.getAllUsers();
          this.dialog.closeAll();
        } else {
          this.toasterService.showErrorToater('Something went wrong')
        }
      })
    }
  }

  getAllUsers() {
    this.organisationService.getOrganisationUsers().subscribe((users: any) => {
      if (users.success) {
        users.data.users.map((user) => {
          if (user.isAdmin) {
            user.isAdmin = '(' + 'Admin' + ')'
            return user;
          } else {
            user.isAdmin = '';

          }
        })
        users.data.users.map((item) => {
          let mobile = (item.mobile).replace(/[^0-9 ]/g, " ")
          let mobileNo = mobile.replace(/\s/g, '')
          item['mobile'] = Number((mobileNo))
          item['name'] = item.firstName + " " + item.middleName + " " + item.lastName;
          item['name1'] = item.firstName + item.middleName + item.lastName;
          // item.roles1= item.roles[0].name +' '+item.isAdmin;
          if (item.isAdmin == '(Admin)') {
            item.roles1 = item.roles[0].name + ' ' + item.isAdmin;
            item.roles1 = item.roles1.trim();
          } else {
            item.roles1 = item.roles[0].name;
            item.roles1 = item.roles1.trim();
          }
          item.roles1 = item.roles1.trim();
          var date = item.createdAt;
          date = new Date(date).toDateString();
          var monthDay = date.substring(4, 10);
          var year = date.substring(10, 15);
          item['sent'] = monthDay + "," + year;
          return item;

        })
        this.dataSource = new MatTableDataSource(users.data.users);
        if (this.dataSource) {
          this.dataSource.filterPredicate = (data: any, filter: string) => {
            const accumulator = (currentTerm, key) => {
              return this.nestedFilterCheck(currentTerm, data, key);
            };
            const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
            const transformedFilter = filter.trim().toLowerCase();
            return dataStr.indexOf(transformedFilter) !== -1;
          };
        }
        this.dataSource.sortingDataAccessor = (item: any, property) => {
          switch (property) {
            case 'name': if (item) return item.firstName + item.middleName + item.lastName;
            case 'roles': if (item) return item.roles[0].name;
            default: if (typeof (item[property]) == 'string') {
              return item[property].toLowerCase();
            } else {
              return item[property]
            }
          }
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {
        this.toasterService.showErrorToater(users.data)
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

  openModal(templateRef, user) {
    this.userId = user.userId
    this.editUserForm.get('firstName').setValue(user.firstName)
    this.editUserForm.get('middleName').setValue(user.middleName)
    this.editUserForm.get('lastName').setValue(user.lastName)
    // let mobile  = (user.mobile).replace(/[^1-9 ]/g, " ").replace(/\s/g,'')
    // let mobileNo =  mobile.replace(/\s/g,'')
    this.editUserForm.get('mobile').setValue(Number((user.mobile)))
    this.editUserForm.get('email').setValue(user.userName)
    this.editUserForm.get('isAdmin').setValue(user.isAdmin)
    this.editUserForm.disable();
    this.editUserForm.get('isAdmin').enable();
    let dialogRef = this.dialog.open(templateRef, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  deleteUserModal(templateRef, userId) {
    this.userId = userId
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  closeModal() {
    this.dialog.closeAll();
  }

  search(searchValue: string) {
    let s=searchValue.replace(/  +/g, ' ');
    // s= searchValue.split(" ").join("")
    this.dataSource.filter = s.trim().toLowerCase();
  }


  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }
  // pagination.
  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length > 500)
      return [10, 50, 100, 500, this.dataSource.paginator.length];
    else if (this.dataSource.data.length > 100) {
      return [10, 50, 100, this.dataSource.paginator.length];
    }
    else if (this.dataSource.data.length > 50) {
      return [10, 50, this.dataSource.paginator.length];
    }
    else if (this.dataSource.data.length > 10) {
      return [10, this.dataSource.paginator.length];
    }
    else {
      return [10];
    }
  }

  backToCases() {
    this.location.back();
  }
}