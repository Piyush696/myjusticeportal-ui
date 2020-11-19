import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HireLawyerService } from 'app/services/hire-lawyer.service';
import { ToasterService } from 'app/services/toaster.service';

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
  hideCases:any;
  hide:boolean=true;
  allCasesData:any;

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
  }

  onViewRejectedCases(e) {
    if (e) {
      let statuses = ['Approved', 'Rejected'];
      this.onGetRequestedCases(statuses);
      this.toasterService.showSuccessToater('Showed approved, rejected cases.');
    } else {
      this.onGetRequestedCases('Approved');
      this.toasterService.showSuccessToater('Showed approved cases only.');
    }
  }

 viewhideCaseDetails(check){
    if (!check) {
      this.hide=true;
      let statuses = 'Approved';
      this.onGetRequestedCases(statuses);
      this.toasterService.showSuccessToater('Showed Hide Cases.');
    }
    else{
      this.hide=false;
      let statuses = ['Approved', 'Rejected'];
      this.onGetRequestedCases(statuses);
      this.toasterService.showSuccessToater('Hide Cases.');
    }
}

hideCaseDetails(caseId) {
  this.hireLawyerService.hideCase({ caseId: caseId}).subscribe((res: any) => {
    if (res.success) {
      let statuses = 'Approved';      
      this.onGetRequestedCases(statuses);
      this.toasterService.showSuccessToater('Hide case successfully.');
    } else {
      this.toasterService.showErrorToater('Something went wrong, please try again.');
    }
  });
}
allCase(){
  this.hireLawyerService.getAllCases().subscribe((res) => {
    this.allCasesData=res.data.lawyer;
    this.dataSource = new MatTableDataSource(res.data.lawyer);
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