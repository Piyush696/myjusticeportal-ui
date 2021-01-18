import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InmateDefenderService } from 'app/services/inmate-defender.service';

@Component({
  selector: 'app-inmates-cases',
  templateUrl: './inmates-cases.component.html',
  styleUrls: ['./inmates-cases.component.css']
})
export class InmatesCasesComponent implements OnInit {

  displayedColumns: string[] = ['updatedAt', 'legalMatter', "briefDescriptionOfChargeOrLegalMatter", "otherInformation","action"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  casesList=[];


  constructor(public dialog: MatDialog, private inmatedefenderService: InmateDefenderService,) { }

  ngOnInit(): void {
    this.getInmatesCases();
  }

  getInmatesCases(){
    this.inmatedefenderService.getInmateCases().subscribe((users:any)=>{
      this.casesList = users.data;
      this.casesList = this.casesList.map((item)=>{
        var date=item.updatedAt;
        date = new Date(date).toDateString();
        var monthDay=date.substring(4, 10);
        var year=date.substring(10, 15);
        item['newUpdatedAt']=monthDay+","+year;
        var month=date.substring(4, 7);
        var day=date.substring(8, 10);
        var year=date.substring(11, 15);
        item['newUpdatedAt1']=month+day+year;
        item['newUpdatedAt2']=month+" "+day+" "+year;
        item['newUpdatedAt3']=month+"/"+day+"/"+year;
        return item;
      })
      this.dataSource = new MatTableDataSource(users.data);
      this.dataSource.sortingDataAccessor = (item: any, property) => {
        switch (property) {
          case 'name': if (item) return item.inmate.firstName + item.inmate.lastName;
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

}
