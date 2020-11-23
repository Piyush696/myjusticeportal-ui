import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { LegalResearchService } from 'app/services/legal-research.service';
import { ToasterService } from 'app/services/toaster.service';
import { FileUploader } from 'ng2-file-upload';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  sharedCaseFiles: any;
  privateCaseFiles: any;
  fileId: number;
  fileType: string = 'private';

  public uploader1: FileUploader = new FileUploader({ url: URL });
  public hasAnotherDropZoneOver: boolean = false;
  reSearchDetails: any;

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(private activatedRoute: ActivatedRoute, private legalResearchService: LegalResearchService,
    private toasterService: ToasterService, public dialog: MatDialog,private route:ActivatedRoute) { }

  ngOnInit(): void {
     this.getSingleFormData();
  }

  getSingleFormData() {
    this.legalResearchService.ongetSingleLegalForms(this.route.snapshot.params['legalResearchId']).subscribe((result: any) => {
      if (result.success) {
       this.reSearchDetails = result.data;
      }
      else {
        this.toasterService.showErrorToater(result.data);
      }
      (error: any) => {
        this.toasterService.showErrorToater(error.statusText);
      }
    })
  }

  filterCases(data: any) {
    if (data) {
      this.sharedCaseFiles = data.filter(data => data.file_case.type == "shared");
      this.privateCaseFiles = data.filter(data => data.file_case.type == "private");
    }
  }

  onUploadCaseFile() {
    let formData = new FormData();
    formData.append('legalResearchId', this.activatedRoute.snapshot.params['legalResearchId']);
    this.uploader1.queue.forEach((file) => {
      formData.append('file', file._file);
    })
    formData.append('type', this.fileType);

    this.legalResearchService.uploadFile(formData).subscribe((res) => {
      this.fileType = 'private';
      if (res.success) {
        this.getSingleFormData();
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
    this.legalResearchService.deleteFile(this.fileId).subscribe((res: any) => {
      if (res.success) {
        this.dialog.closeAll();
        this.toasterService.showSuccessToater('Case file deleted successfully.');
        this.getSingleFormData();
      } else {
        this.toasterService.showErrorToater(res.data);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

}
