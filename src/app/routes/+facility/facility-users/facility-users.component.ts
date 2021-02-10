import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FacilityService } from 'app/services/facility.service';

@Component({
  selector: 'app-facility-users',
  templateUrl: './facility-users.component.html',
  styleUrls: ['./facility-users.component.css']
})
export class FacilityUsersComponent implements OnInit {

  displayedColumns: string[] = ["name", "username", "email", "mobile"];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(private facilityService:FacilityService) { }

  ngOnInit(): void {
    this.getAllFacilityUsers();
  }

  search(searchValue: string) {
    let s=searchValue.replace(/  +/g, ' ');
    s= searchValue.split(" ").join("")
    this.dataSource.filter = s.trim().toLowerCase();
 }
 
  getAllFacilityUsers(){
    this.facilityService.getFacilityUsers().subscribe((users:any)=>{
      this.dataSource.sortingDataAccessor = (item: any, property) => {
        switch (property) {
          case 'name': if (item) return item.firstName + item.middleName + item.lastName;
            return item[property]
        }
      };
      this.dataSource = new MatTableDataSource(users.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


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

}
