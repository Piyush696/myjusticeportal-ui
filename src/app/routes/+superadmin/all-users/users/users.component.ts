import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToasterService } from 'app/services/toaster.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit, OnDestroy {
  userInfo: any;
  userInfoStoreSub: Subscription;

  displayedColumns: string[] = ["name", "userName", "roles", "createdAt", "action"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private userService: UserService, private store: Store<any>,
    private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.onGetAllUsers();
    this.onGetUserInfo();
  }

  onGetUserInfo() {
    this.userInfoStoreSub = this.store.select(s => s.userInfo).subscribe(data => this.userInfo = data);
  }

  onGetAllUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      // console.log(res.data);
      this.dataSource = new MatTableDataSource(res.data);
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

  onDeleteUser(user) {
    if (user.userId != this.userInfo.userId) {
      this.userService.deleteUser(+user.userId).subscribe((res: any) => {
        // console.log(res);
        if (res.success) {
          this.toasterService.showSuccessToater('User(' + user.firstName + ' ' + user.lastName + ') successfully deleted.');
          this.onGetAllUsers();
        } else {
          this.toasterService.showErrorToater('User(' + user.firstName + ' ' + user.lastName + ') is not deleted.');
        }
      });
    } else {
      this.toasterService.showErrorToater('You can not delete yourself. You are logged in.');
    }
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

  ngOnDestroy(): void {
    this.userInfoStoreSub.unsubscribe();
  }
}