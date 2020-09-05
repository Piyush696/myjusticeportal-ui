import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrganisationService } from 'app/services/organisation.service';
import { ToasterService } from 'app/services/toaster.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  displayedColumns: string[] = ["name", "userName", "roles", "createdAt", "action"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private store: Store<any>,
    private toasterService: ToasterService, private organisationService: OrganisationService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.organisationService.getOrganisationUsers().subscribe((users: any) => {
      console.log(users)
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
    })
  }


  search(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

}
