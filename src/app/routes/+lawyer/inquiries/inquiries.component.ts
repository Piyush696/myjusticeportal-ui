import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from 'app/services/toaster.service';
import { HireLawyerService } from 'app/services/hire-lawyer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FacilityService } from 'app/services/facility.service'


@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit {
  pendingCasesList: any;
  displayedColumns: string[] = ["name", "briefDescriptionOfChargeOrLegalMatter", "sentAt", "status", "action"];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  userId: any;
  plans: any;
  allApprovedData = [];
  approvedStatus: any;
  userName: string;


  constructor(private userAdditionInfoService: UserAdditionInfoService, public dialog: MatDialog,
    private toasterService: ToasterService, private router: Router, private facilityService: FacilityService) { }

  ngOnInit(): void {
    this.getPendingCaseDetails();
    this.getSelectedPlan();
  }
  
  getSelectedPlan() {
    this.facilityService.getSelectedPlanFaciltiy().subscribe((selectedPlan: any) => {
      this.plans = selectedPlan.data;
      if (this.plans[0].planSelected == "Up to 5 Connections") {
        this.approvedStatus = 4;
      } else if (this.plans[0].planSelected == "Up to 25 Connections") {
        this.approvedStatus = 24;
      } else if (this.plans[0].planSelected == "Unlimited Connections") {
        this.approvedStatus = this.approvedStatus;
      }
    });
  }
  search(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (searchValue: any, filter) => {
      const dataStr = JSON.stringify(searchValue).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }

  getPendingCaseDetails() {
    this.userAdditionInfoService.getLawyerCases().subscribe((pendingCase: any) => {
      this.pendingCasesList = pendingCase.data
      this.pendingCasesList = this.pendingCasesList.map((item) => {
        item['name'] = item.inmate.firstName + " " + item.inmate.lastName;
        item['name1'] = item.inmate.firstName + item.inmate.lastName;
        var date = item.sentAt;
        date = new Date(date).toDateString();
        var monthDay = date.substring(4, 10);
        var year = date.substring(10, 15);
        item['sent'] = monthDay + "," + year;
        var month = date.substring(4, 7);
        var day = date.substring(8, 10);
        var year = date.substring(11, 15);
        item['newUpdatedAt1'] = month + day + year;
        item['newUpdatedAt2'] = month + " " + day + " " + year;
        item['newUpdatedAt3'] = month + "/" + day + "/" + year;
        return item;
      })
      this.allApprovedData = this.pendingCasesList.filter(approvedData => approvedData.status == 'Approved')
      this.dataSource = new MatTableDataSource(this.pendingCasesList);
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

  onOpenModal(templateRef, userId, user) {
    this.userId = userId
    user.middleName = user.middleName ? user.middleName : ' '
    this.userName = user.firstName + ' ' + user.middleName + ' ' + user.lastName
    let dialogRef = this.dialog.open(templateRef, {
      width: '800px',
    });
  }

  closeModal() {
    this.dialog.closeAll()
  }

  onStatusUpdate(caseId, status) {
    const data = {
      'caseId': caseId,
      'status': status
    }
    this.userAdditionInfoService.updateLawywrStatus(data).subscribe((res: any) => {
      if (res.success) {
        this.getPendingCaseDetails();
        this.toasterService.showSuccessToater('Status update successfully.');
      } else {
        this.toasterService.showErrorToater('Something went wrong, please try again.');
      }
    });
  }

  onChatEnable() {
    this.dialog.closeAll();
    this.router.navigateByUrl('/mjp/lawyer/lawyer-chat/' + this.userId);
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
