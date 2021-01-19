import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefenderService } from 'app/services/defender.service';
import { InmateDefenderService } from 'app/services/inmate-defender.service';
import { FacilityService } from 'app/services/registration/facility.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-search-inmates',
  templateUrl: './search-inmates.component.html',
  styleUrls: ['./search-inmates.component.css']
})

export class SearchInmatesComponent implements OnInit {
  usersList = [];
  facilityList = [];
  filterUsersList = []
  displayedColumns: string[] = ["name", "facilities","action"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  publicdefenderId: any;
  
  constructor(public dialog: MatDialog,private defenderService:DefenderService, private inmateDefenderService:InmateDefenderService,  private facilityService: FacilityService ,private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.getFacilityInmates();
    this.getALLFacilities();
  }

  onFacilityFiltered(facility) {
    if(facility.value){
      this.filterUsersList = this.usersList.filter((client) => {
        return client.facilities[0].facilityId == facility.value
      })
    } else {
      this.filterUsersList = this.usersList
    }
    this.dataSource = new MatTableDataSource(this.filterUsersList)
  }

  getFacilityInmates(){
    this.defenderService.getInmateUser().subscribe((users:any)=>{
      this.usersList = users.data
      this.dataSource = new MatTableDataSource(users.data);
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
          case 'facilities': if (item) return item.facilities[0].facilityName;
          default:  if (typeof (item[property]) == 'string') {
            return item[property].toLowerCase();
          } else {
            return item[property]
          }
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  
  search(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
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
  

  getALLFacilities() {
    this.inmateDefenderService.getRegisteredFacilities().subscribe((facilities: any) => {
      this.facilityList = facilities.data;
    })
  }

  onCancel(){
    this.dialog.closeAll();
  }

}
