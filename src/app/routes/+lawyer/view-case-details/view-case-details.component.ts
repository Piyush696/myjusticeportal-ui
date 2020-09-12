import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HireLawyerService } from '../../../services/hire-lawyer.service';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-view-case-details',
  templateUrl: './view-case-details.component.html',
  styleUrls: ['./view-case-details.component.scss']
})

export class ViewCaseDetailsComponent implements OnInit {
  singleCaseData: any;

  constructor(private hireLawyerService: HireLawyerService, private activatedRoute: ActivatedRoute,
    private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.onGetCaseData();
  }

  onGetCaseData() {
    if (this.activatedRoute.snapshot.params['caseId']) {
      this.hireLawyerService.getRequestedCaseById(this.activatedRoute.snapshot.params['caseId']).subscribe((res: any) => {
        if (res.data) {
          this.singleCaseData = res.data.lawyer[0];
          console.log(this.singleCaseData);
        } else {
          this.toasterService.showErrorToater('No data found, invalid url detected.');
        }
      })
    }
  }

  onApproveCase(caseId) {
    console.log(caseId);
  }

  onRejectCase(caseId) {
    console.log(caseId);
  }

  onDownloadCaseFile(fileId) {
    console.log(fileId);
    // let data: any = {};
    // data.caseId = this.uploadedCaseFiles.caseId;
    // data.fileId = fileId;

    // this.hireLawyerService.getDownloadLink(data).subscribe((res: any) => {
    //   if (res.success) {
    //     window.open(res.data, '_self ');
    //   } else {
    //     this.toasterService.showErrorToater(res.data);
    //   }
    // }, (error: any) => {
    //   this.toasterService.showErrorToater(error.statusText);
    // })
  }
}