import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HireLawyerService } from '../../../services/hire-lawyer.service';
import { ToasterService } from '../../../services/toaster.service';
import { FileUploader } from 'ng2-file-upload';
import { MatDialog } from '@angular/material/dialog';
import { CaseService } from 'app/services/case.service';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
@Component({
  selector: 'app-view-case-details',
  templateUrl: './view-case-details.component.html',
  styleUrls: ['./view-case-details.component.scss']
})

export class ViewCaseDetailsComponent implements OnInit {
  singleCaseData: any;

  sharedCaseFiles: any;
  privateCaseFiles: any;
  fileId: number;
  fileType: string = 'public-read';

  public uploader1: FileUploader = new FileUploader({ url: URL });
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  constructor(private hireLawyerService: HireLawyerService, private activatedRoute: ActivatedRoute,private caseService: CaseService,
    private toasterService: ToasterService, private location: Location,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.onGetCaseData();
  }

  onGetCaseData() {
    if (this.activatedRoute.snapshot.params['caseId']) {
      this.hireLawyerService.getRequestedCaseById(this.activatedRoute.snapshot.params['caseId']).subscribe((res: any) => {
        if (res.data) {
          this.singleCaseData = res.data.lawyer[0];
        } else {
          this.toasterService.showErrorToater('No data found, invalid url detected.');
        }
      })
    } else {
      this.toasterService.showErrorToater('No data found, invalid url detected.');
    }
  }

  onSelectFile(file){
    this.isDisabled();
  }

  isDisabled():boolean {
    let isExist:boolean;
    let x = ['jpg','jpeg','png','pdf']
    let filetype = this.uploader1.queue[0].file.type.split('/')[1]
    if(x.includes(filetype)){
      isExist = true;
    }else{
      isExist = false;
    }
    return isExist
  }

  onGoBack() {
    this.location.back();
  }

  onDownloadCaseFile(fileId) {
    let sendData: any = {};
    sendData.userId = this.singleCaseData.userId;
    sendData.caseId = this.singleCaseData.caseId;
    sendData.fileId = fileId;
    this.hireLawyerService.getDownloadLink(sendData).subscribe((res: any) => {
      if (res.success) {
        window.open(res.data, '_self ');
      } else {
        this.toasterService.showErrorToater(res.data);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
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

  onOpenModal(templateRef, fileId) {
    this.fileId = fileId
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  closeModal() {
    this.dialog.closeAll();
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

  // onDownloadCaseFile(fileId) {
  //   let data: any = {};
  //   data.caseId = this.activatedRoute.snapshot.params['caseId'];
  //   data.fileId = fileId;
  //   this.caseService.getDownloadLink(data).subscribe((res: any) => {
  //     if (res.success) {
  //       window.open(res.data, '_self');
  //     } else {
  //       this.toasterService.showErrorToater(res.data);
  //     }
  //   }, (error: any) => {
  //     this.toasterService.showErrorToater(error.statusText);
  //   })
  // }
}