import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OrganisationService } from 'app/services/organisation.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToasterService } from 'app/services/toaster.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private location: Location, public dialog: MatDialog, private fb: FormBuilder,
    private organisationService: OrganisationService, private toasterService: ToasterService,) { }

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
      mobile: ['']
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllUsers() {
    this.organisationService.getOrganisationUsers().subscribe((users: any) => {
      if (users.success) {
        users.data.users.map((item) => {
          item['name'] = item.firstName + " " + item.middleName + " " + item.lastName;
          item['name1'] = item.firstName + item.middleName + item.lastName;
          var date = item.createdAt;
          date = new Date(date).toDateString();
          var monthDay = date.substring(4, 10);
          var year = date.substring(10, 15);
          item['sent'] = monthDay + "," + year;
          return item;
        })
        this.dataSource = new MatTableDataSource(users.data.users);
        this.dataSource.sortingDataAccessor = (item: any, property) => {
          switch (property) {
            case 'name': if (item) return item.firstName + item.middleName + item.lastName;
            case 'roles': if (item) return item.roles[0].name;
            default: return item[property];
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
    this.editUserForm.get('firstName').setValue(user.firstName)
    this.editUserForm.get('middleName').setValue(user.middleName)
    this.editUserForm.get('lastName').setValue(user.lastName)
    this.editUserForm.get('mobile').setValue(user.mobile)
    this.editUserForm.get('email').setValue(user.userName)
    this.editUserForm.disable();
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
    this.dataSource.filter = searchValue.trim().toLowerCase();
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