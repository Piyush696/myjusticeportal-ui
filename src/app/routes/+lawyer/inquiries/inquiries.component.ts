import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from 'app/services/toaster.service';
import { HireLawyerService } from 'app/services/hire-lawyer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit {
  pendingCasesList: any;
  displayedColumns: string[] = ["name", "caseDescription", "sent", "status", "action"];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private userAdditionInfoService: UserAdditionInfoService, public dialog: MatDialog,
    private toasterService: ToasterService, private router: Router) { }

  ngOnInit(): void {
    this.getPendingCaseDetails();
  }

  search(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  getPendingCaseDetails() {
    this.userAdditionInfoService.getLawyerCases().subscribe((pendingCase: any) => {
      this.pendingCasesList = pendingCase.data
      let emptyDataSource = []
      this.dataSource = new MatTableDataSource(emptyDataSource);
      this.dataSource = new MatTableDataSource(this.pendingCasesList);

    })
  }
  onOpenModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '350px',
      height: '220px'
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
    this.router.navigateByUrl('/mjp/lawyer/lawyer-chat');
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
