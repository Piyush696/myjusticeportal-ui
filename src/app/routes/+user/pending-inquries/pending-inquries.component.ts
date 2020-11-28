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


  pendingCasesList = [];
  filteredPendingInquiriesList = [];

  constructor(private caseService: CaseService, public dialog: MatDialog,
    private additionalService: UserAdditionInfoService, private toasterService: ToasterService, public router: Router) { }

  ngOnInit(): void {
    this.getPendingCaseDetails();
  }

  search(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  onOpenModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '550px',
      height: '200px'
    });
  }

  viewhidePendingInquiries(value) {
    if (value) {
      this.filteredPendingInquiriesList = [];
      this.pendingCasesList.filter((ele) => {
        if (ele.status === 'Rejected') {
          this.filteredPendingInquiriesList.push(ele)
        }
      })
      this.dataSource = new MatTableDataSource(this.filteredPendingInquiriesList);

    } else {
      this.filteredPendingInquiriesList = this.pendingCasesList.filter((element) => {
        if (element.status != 'Rejected') {
          return element
        }
      })
      this.dataSource = new MatTableDataSource(this.filteredPendingInquiriesList);

    }
  }

  closeModal() {
    this.dialog.closeAll();
  }

  getPendingCaseDetails() {
    this.caseService.getPendingCaseInfo().subscribe((pendingCase: any) => {
      this.pendingCasesList = pendingCase.data.map((status) => {
        if (status.status && status.status === 'Rejected') {
          status['statusDeclared'] = 'Lawyer Rejected'
        }
        else if (status.status && status.status === 'Requested') {
          status['statusDeclared'] = 'Lawyer Requested'
        }
        else if (status.status && status.status === 'Approved') {
          status['statusDeclared'] = 'Lawyer Approved'
        }
        else if (status.status && status.status === 'inmate_accepted') {
          status['statusDeclared'] = 'Inmate Approved'
        }
        else if (status.status && status.status === 'inmate_rejected') {
          status['statusDeclared'] = 'Inmate Rejected'
        }
        else if (status.status && status.status === 'chatEnabled') {
          status['statusDeclared'] = 'Inmate chatEnabled'
        }
        return status
      })
      this.pendingCasesList.filter((x) => {
        if (x.status != 'Rejected') {
          this.filteredPendingInquiriesList.push(x)
        }
      })

      this.dataSource = new MatTableDataSource(this.pendingCasesList);

    })
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
    this.router.navigateByUrl('mjp/user/message-my-lawyer')
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