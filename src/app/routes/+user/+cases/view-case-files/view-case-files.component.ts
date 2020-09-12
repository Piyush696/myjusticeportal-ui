import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FileUploader } from 'ng2-file-upload';
import { CaseService } from 'app/services/case.service';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'app/services/toaster.service';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-view-case-files',
  templateUrl: './view-case-files.component.html',
  styleUrls: ['./view-case-files.component.scss']
})

export class ViewCaseFilesComponent implements OnInit {
  uploadedCaseFiles: any;

  public uploader1: FileUploader = new FileUploader({ url: URL });
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(private activatedRoute: ActivatedRoute, private location: Location,
    private caseService: CaseService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.onGetCase();
  }

  onGetCase() {
    this.caseService.getCase(this.activatedRoute.snapshot.params['caseId']).subscribe((res: any) => {
      if (res.success) {
        this.uploadedCaseFiles = res.data;
        // console.log(this.uploadedCaseFiles);
      } else {
        this.toasterService.showErrorToater(res.data);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

  backToCases() {
    this.location.back();
  }

  onUploadCaseFile() {
    // this.loading = true;
    let formData = new FormData();
    if (this.uploadedCaseFiles) {
      formData.append('caseId', this.uploadedCaseFiles.caseId);
    } else {
      formData.append('caseId', this.activatedRoute.snapshot.params['caseId']);
    }
    this.uploader1.queue.forEach((file) => {
      formData.append('file', file._file);
    })

    this.caseService.uploadFile(formData).subscribe((res) => {
      if (res.success) {
        // this.loading = false;
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

  onDeleteCaseFile(fileId) {
    this.caseService.deleteFile(fileId).subscribe((res: any) => {
      if (res.success) {
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
    data.caseId = this.uploadedCaseFiles.caseId;
    data.fileId = fileId;

    this.caseService.getDownloadLink(data).subscribe((res: any) => {
      if (res.success) {
        window.open(res.data, '_self ');
      } else {
        this.toasterService.showErrorToater(res.data);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }
}