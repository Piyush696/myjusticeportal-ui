import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HireLawyerService } from 'app/services/hire-lawyer.service';
import { ToasterService } from 'app/services/toaster.service';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-accepted-cases',
  templateUrl: './accepted-cases.component.html',
  styleUrls: ['./accepted-cases.component.scss']
})

export class AcceptedCasesComponent implements OnInit {
  displayedColumns: string[] = ["createdAt", "name","countyOfArrest","status", "briefDescriptionOfChargeOrLegalMatter"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  filterStatus: any;
  requestedCases: any;
  hide:boolean=true;
  allCasesData:any;
  activeCase:number=0;

  constructor(private hireLawyerService: HireLawyerService, private toasterService: ToasterService) { }
  ngOnInit(): void {
    this.onGetRequestedCases('Approved');
    this.allCase()
  }

  onGetRequestedCases(status) {
    this.hireLawyerService.getRequestedCases({ status: status }).subscribe((res: any) => {
      if (res.data) {
        this.requestedCases = res.data.lawyer;
      } else {
        this.requestedCases = [];
      }
    })
  }

  search(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (searchValue: any, filter) => {
      const dataStr =JSON.stringify(searchValue).toLowerCase();
      return dataStr.indexOf(filter) != -1; 
    }
  }

  onViewRejectedCases(e) {
    if (e) {
      this.activeCase=2;
      let statuses = ['Rejected'];
      this.onGetRequestedCases(statuses);
      this.toasterService.showSuccessToater('Showing rejected cases.');
    } else {
      this.activeCase=0;
      this.onGetRequestedCases('Approved');
      this.toasterService.showSuccessToater('Showed approved cases.');
    }
  }


 viewhideCaseDetails(check){
    if (!check) {
      this.activeCase=0;
      this.hide=true;
      let status = 'Approved';
      this.onGetRequestedCases(status);
      this.toasterService.showSuccessToater('Showed approved cases.');
    }
    else{
      this.activeCase=1;
      this.hide=false;
      let status = ['Approved', 'Rejected'];
      this.onGetRequestedCases(status);
      this.toasterService.showSuccessToater('Showing Hide cases.');
    }
}

hideCaseDetails(caseId) {
  const data = {
    "caseId" : caseId,
    "isHide" : true
  }
  this.hireLawyerService.hideCase(data).subscribe((res: any) => {
    if (res.success) {
      let status = 'Approved';      
      this.onGetRequestedCases(status);
      this.toasterService.showSuccessToater('Hide case successfully.');
    } else {
      this.toasterService.showErrorToater('Something went wrong, please try again.');
    }
  });
}

unHideCaseDetails(caseId){
  const data = {
    "caseId" : caseId,
    "isHide" : false
  }
  this.hireLawyerService.hideCase(data).subscribe((res: any) => {
    if (res.success) {
      let status = ['Approved', 'Rejected'];      
      this.onGetRequestedCases(status);
      this.toasterService.showSuccessToater('Unhide case successfully.');
    } else {
      this.toasterService.showErrorToater('Something went wrong, please try again.');
    }
  });
}

allCase(){
  this.hireLawyerService.getAllCases().subscribe((res) => {
    this.allCasesData=res.data.lawyer
    this.allCasesData = this.allCasesData.map((item)=>{
      item['name'] = item.inmate.firstName+' '+item.inmate.middleName+' '+item.inmate.lastName;
      item['name1'] = item.inmate.firstName+item.inmate.middleName+item.inmate.lastName;
      var date=item.lawyer_case.updatedAt;
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
    this.dataSource = new MatTableDataSource(this.allCasesData);
    this.dataSource.sortingDataAccessor = (item: any, property) => {
      switch (property) {
        case 'name': if (item) return item.inmate.firstName + item.inmate.middleName +  item.inmate.lastName;
        case 'status': if (item) return item.lawyer_case.status;
        default: return item[property];
      }
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }) 
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
}