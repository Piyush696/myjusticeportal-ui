import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'app/services/toaster.service';
import { Location } from '@angular/common';
import { HireLawyerService } from 'app/services/hire-lawyer.service';
import { FileUploader } from 'ng2-file-upload';
import { CaseService } from 'app/services/case.service';
import { MatDialog } from '@angular/material/dialog';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
@Component({
  selector: 'app-inquiries-case-view',
  templateUrl: './inquiries-case-view.component.html',
  styleUrls: ['./inquiries-case-view.component.css']
})
export class InquiriesCaseViewComponent implements OnInit {
  singleCaseData: any;
  sharedCaseFiles: any;
  privateCaseFiles: any;
  fileId: number;
  fileType: string = 'private';
  isChatLimit: boolean = true

  public uploader1: FileUploader = new FileUploader({ url: URL });
  public hasAnotherDropZoneOver: boolean = false;
  userId: any;
  userName: string;

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(private hireLawyerService: HireLawyerService, private userAdditionInfoService: UserAdditionInfoService, private activatedRoute: ActivatedRoute,
    private location: Location, private toasterService: ToasterService, private caseService: CaseService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.onGetCaseData();
  } a

  closeModal() {
    this.dialog.closeAll();
  }

  onGetCaseData() {
    if (this.activatedRoute.snapshot.params['caseId']) {
      this.caseService.getLawyerCase(this.activatedRoute.snapshot.params['caseId']).subscribe((res: any) => {
        if (res.data) {
          this.singleCaseData = res.data;
        } else {
          this.toasterService.showErrorToater('No data found, invalid url detected.');
        }
      })
    } else {
      this.toasterService.showErrorToater('No data found, invalid url detected.');
    }
  }

  onDeleteCaseFile() {
    this.caseService.deleteFile(this.fileId).subscribe((res: any) => {
      if (res.success) {
        this.dialog.closeAll();
        this.toasterService.showSuccessToater('Case file deleted successfully.');
        this.onGetCaseData();
      } else {
        this.toasterService.showErrorToater(res.data);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

  onGoBack() {
    this.location.back();
  }


  onUploadCaseFile() {
    let formData = new FormData();
    formData.append('caseId', this.activatedRoute.snapshot.params['caseId']);
    this.uploader1.queue.forEach((file) => {
      formData.append('file', file._file);
    })
    formData.append('type', this.fileType);
    this.caseService.uploadFile(formData).subscribe((res) => {
      this.fileType = 'private';
      if (res.success) {
        this.onGetCaseData();
        this.uploader1.queue = [];
        this.toasterService.showSuccessToater('File uploaded successfully.');
      } else {
        this.toasterService.showErrorToater(res.data);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
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

  isModelClose(value) {
    if (value) {
      this.dialog.closeAll();
    }
  }

  onStatusUpdate(caseId, status) {
    const data = {
      'caseId': caseId,
      'status': status
    }
    this.userAdditionInfoService.updateLawywrStatus(data).subscribe((res: any) => {
      if (res.success) {
        this.onGetCaseData();
        if (status == 'Lawyer Approved') {
          this.toasterService.showSuccessToater('Please note the inmate must also accept for the connection to become active.');
        } else {
          this.toasterService.showSuccessToater('Status updated successfully');
        }
      } else {
        if (res.data === 'Connection limit reached.') {
          this.toasterService.showErrorToater('Connection limit reached.');
        } else {
          this.toasterService.showErrorToater('Something went wrong, please try again.');
        }
      }
    });
  }

}
