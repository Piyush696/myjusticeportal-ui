import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganisationService } from 'app/services/organisation.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToasterService } from 'app/services/toaster.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})

export class ViewUsersComponent implements OnInit {

  displayedColumns: string[] = ["name", "userName", "roles", "createdAt"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private location: Location, private organisationService: OrganisationService, private toasterService: ToasterService,) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.organisationService.getOrganisationUsers().subscribe((users: any) => {
      if (users.success) {
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