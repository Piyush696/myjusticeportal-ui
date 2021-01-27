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
  displayedColumns: string[] = ["createdAt", "name", "countyOfArrest", "status", "briefDescriptionOfChargeOrLegalMatter"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  filterStatus: any;
  requestedCases: any;
  allRequestedCases: any;
  isHidden: boolean;
  allCasesData: any;
  currentCases: any = ['Lawyer Approved'];

  constructor(private hireLawyerService: HireLawyerService, private toasterService: ToasterService) { }
  
  ngOnInit(): void {
    this.onGetRequestedCases('Connected');
    this.allCase()
  }

  onGetRequestedCases(status) {
    this.hireLawyerService.getRequestedCases({ status: status }).subscribe((res: any) => {
      if (res.data) {
        console.log(res.data)
        this.allRequestedCases = res.data.lawyer;
        if(!this.isHidden){
          this.requestedCases = this.allRequestedCases.filter(findHideCase => !findHideCase.lawyer_case.isHide);
        } else {
          console.log('====not hidden')
          // this.requestedCases = this.allRequestedCases;
        }
      } else {
        this.requestedCases = [];
      }
    })
  }

  search(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (searchValue: any, filter) => {
      const dataStr = JSON.stringify(searchValue).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }


  viewhideCaseDetails(check) {
    this.isHidden = check;
    if (check) {
      this.requestedCases = this.allRequestedCases.filter(findHideCase => findHideCase.lawyer_case.isHide);
    }
    else {
      this.requestedCases = this.allRequestedCases.filter(findHideCase => !findHideCase.lawyer_case.isHide);
    }
  }

  hideCaseDetails(caseId) {
    const data = {
      "caseId": caseId,
      "isHide": true
    }
    this.hireLawyerService.hideCase(data).subscribe((res: any) => {
      if (res.success) {
        let status = 'Connected';
        this.onGetRequestedCases(status);
          this.toasterService.showSuccessToater('Hide case successfully.');
      } else {
        this.toasterService.showErrorToater('Something went wrong, please try again.');
      }
    });
  }

  unHideCaseDetails(caseId) {
    const data = {
      "caseId": caseId,
      "isHide": false
    }
    this.hireLawyerService.hideCase(data).subscribe((res: any) => {
      if (res.success) {
        let status = 'Connected';
        this.onGetRequestedCases(status);
        this.requestedCases = this.requestedCases.filter(x => x.caseId != caseId)
        this.toasterService.showSuccessToater('Unhide case successfully.');
      } else {
        this.toasterService.showErrorToater('Something went wrong, please try again.');
      }
    });
  }

  allCase() {
    this.hireLawyerService.getAllCases().subscribe((res) => {
      this.allCasesData = res.data.lawyer
      this.allCasesData = this.allCasesData.map((item) => {
        item['name'] = item.inmate.firstName + ' ' + item.inmate.middleName + ' ' + item.inmate.lastName;
        item['name1'] = item.inmate.firstName + item.inmate.middleName + item.inmate.lastName;
        var date = item.lawyer_case.updatedAt;
        date = new Date(date).toDateString();
        var monthDay = date.substring(4, 10);
        var year = date.substring(10, 15);
        item['newUpdatedAt'] = monthDay + "," + year;
        var month = date.substring(4, 7);
        var day = date.substring(8, 10);
        var year = date.substring(11, 15);
        item['newUpdatedAt1'] = month + day + year;
        item['newUpdatedAt2'] = month + " " + day + " " + year;
        item['newUpdatedAt3'] = month + "/" + day + "/" + year;
        return item;
      })
      this.dataSource = new MatTableDataSource(this.allCasesData);
      this.dataSource.sortingDataAccessor = (item: any, property) => {
        switch (property) {
          case 'name': if (item) return item.inmate.firstName + item.inmate.middleName + item.inmate.lastName;
          case 'status': if (item) return item.lawyer_case.status;
          default: if (typeof (item[property]) == 'string') {
            return item[property].toLowerCase();
          } else {
            return item[property]
          }
        }
      };
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
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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