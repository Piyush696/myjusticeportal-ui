import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { ToasterService } from 'app/services/toaster.service';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-pending-inquries',
  templateUrl: './pending-inquries.component.html',
  styleUrls: ['./pending-inquries.component.css']
})
export class PendingInquriesComponent implements OnInit {

  displayedColumns: string[] = ["lawFirm", "lawyer", "sent", "status", "action"];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  connectedInquiries = [];
  filteredPendingInquiriesList = [];
  filteredRejectedPendingInquiriesList = [];
  userId: any;
  userName: any;

  constructor(private caseService: CaseService, public dialog: MatDialog,
    private additionalService: UserAdditionInfoService, private toasterService: ToasterService, public router: Router) { }

  ngOnInit(): void {
    this.getPendingCaseDetails();
  }

  search(searchValue: string) {
    let s=searchValue.replace(/  +/g, ' ');
    s= searchValue.split(" ").join("")
    this.dataSource.filter = s.trim().toLowerCase();
 }

  onOpenModal(templateRef, userId, user) {
    this.userId = userId
    user.middleName = user.middleName ? user.middleName : ' '
    this.userName = user.firstName + ' ' + user.middleName + ' ' + user.lastName
    let dialogRef = this.dialog.open(templateRef, {
      width: '800px'
    });
  }

  viewhidePendingInquiries(value) {
    if (value) {
      this.dataSource = new MatTableDataSource(this.filteredRejectedPendingInquiriesList);
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
          case 'lawyer': if (item) return item.firstName + item.middleName + item.lastName;
          case 'lawFirm': if (item) return item.Organization.name;
          default: if (typeof (item[property]) == 'string') {
            return item[property].toLowerCase();
          } else {
            return item[property]
          }
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource = new MatTableDataSource(this.filteredPendingInquiriesList);
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
          case 'lawyer': if (item) return item.firstName + item.middleName + item.lastName;
          case 'lawFirm': if (item) return item.Organization.name;
          default: if (typeof (item[property]) == 'string') {
            return item[property].toLowerCase();
          } else {
            return item[property]
          }
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  closeModal() {
    this.dialog.closeAll();
  }

  isModelClose(value) {
    if (value) {
      this.dialog.closeAll();
    }
  }

  getPendingCaseDetails() {
    this.connectedInquiries = []
    this.filteredPendingInquiriesList = [];
    this.filteredRejectedPendingInquiriesList = []
    this.caseService.getInmateCases().subscribe((pendingCase: any) => {
      console.log(pendingCase)
      let inquiries = pendingCase.data.map((status) => {
        status['name0'] = status.organization;
        status['name1'] = status.organization.split(" ").join("");
        status['name2'] = status.firstName + " " + status.lastName;
        status['name3'] = status.firstName + status.lastName;
        var date = status.createdAt;
        date = new Date(date).toDateString();
        var monthDay = date.substring(4, 10);
        var year = date.substring(10, 15);
        status['sent'] = monthDay + "," + year;
        var month = date.substring(4, 7);
        var day = date.substring(8, 10);
        var year = date.substring(11, 15);
        status['newUpdatedAt1'] = month + day + year;
        status['newUpdatedAt2'] = month + " " + day + " " + year;
        status['newUpdatedAt3'] = month + "/" + day + "/" + year;
        return status
      })
      inquiries.filter((x) => {
        if (x.status == 'Lawyer Rejected' || x.status == 'Inmate Rejected') {
          this.filteredRejectedPendingInquiriesList.push(x)
        } else if (x.status == 'Connected') {
            this.connectedInquiries.push(x)
        }
        else {
          this.filteredPendingInquiriesList.push(x)
        }
        this.dataSource = new MatTableDataSource(this.filteredPendingInquiriesList);

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
            case 'lawyer': if (item) return item.firstName + item.middleName + item.lastName;
            case 'lawFirm': if (item) return item.organization;
            case 'status': if (item) return item.status;
            default: if (typeof (item[property]) == 'string') {
              return item[property].toLowerCase();
            } else {
              return item[property]
            }
          }
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

  viewConnectedInquiries(check) {
    if (check) {
      this.dataSource = new MatTableDataSource(this.connectedInquiries);
    } else {
      this.dataSource = new MatTableDataSource(this.filteredPendingInquiriesList);
    }
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

  onClickStatus(status, lawyerId, caseId) {
    const updatedStatus = {
      "status": status,
      "lawyerId": lawyerId,
      "caseId": caseId
    }
    this.additionalService.updateInmateStatus(updatedStatus).subscribe((res: any) => {
      if (res.success) {
        this.getPendingCaseDetails()
        this.toasterService.showSuccessToater('Case status updated successfully.')
      } else {
        this.toasterService.showErrorToater('Case not updated.')
      }
    })
  }

  saveChanges() {
    this.dialog.closeAll();
    this.router.navigateByUrl('mjp/user/message-my-lawyer/' + this.userId)
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
