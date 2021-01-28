import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { CaseService } from 'app/services/case.service';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'app/services/toaster.service';
import { MatDialog } from '@angular/material/dialog';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-view-case-files',
  templateUrl: './view-case-files.component.html',
  styleUrls: ['./view-case-files.component.scss']
})

export class ViewCaseFilesComponent implements OnInit {
  sharedCaseFiles: any;
  privateCaseFiles: any;
  fileId: number;
  fileType: string = 'public';

  public uploader1: FileUploader = new FileUploader({ url: URL });
  public hasAnotherDropZoneOver: boolean = false;
  fileDetails: any;

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(private activatedRoute: ActivatedRoute, private caseService: CaseService,
    private toasterService: ToasterService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.onGetCase();
  }

  onGetCase() {
    this.caseService.getCase(this.activatedRoute.snapshot.params['caseId']).subscribe((res: any) => {
      if (res.success) {
        this.filterCases(res.data.caseFile);
      } else {
        this.toasterService.showErrorToater(res.data);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

  filterCases(data: any) {
    if (data) {
      // this.sharedCaseFiles = data.filter(data => data.file_case.type == "shared");
      // this.privateCaseFiles = data.filter(data => data.file_case.type == "private");
      this.privateCaseFiles = data;
    }
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
        this.onGetCase();
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
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openModal(templateRef, file){
    this.fileDetails = file
    let dialogRef = this.dialog.open(templateRef, {
      width: '800px',
      height:'500px'
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
        this.onGetCase();
      } else {
        this.toasterService.showErrorToater(res.data);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

  onDownloadCaseFile(fileId) {
    let data: any = {};
    data.caseId = this.activatedRoute.snapshot.params['caseId'];
    data.fileId = fileId;
    this.caseService.getDownloadLink(data).subscribe((res: any) => {
      if (res.success) {
        window.open(res.data, '_self');
      } else {
        this.toasterService.showErrorToater(res.data);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }
}