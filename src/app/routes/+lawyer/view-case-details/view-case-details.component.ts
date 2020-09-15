import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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
    private toasterService: ToasterService, private location: Location) { }

  ngOnInit(): void {
    this.onGetCaseData();
  }

  onGetCaseData() {
    if (this.activatedRoute.snapshot.params['caseId']) {
      this.hireLawyerService.getRequestedCaseById(this.activatedRoute.snapshot.params['caseId']).subscribe((res: any) => {
        if (res.data) {
          this.singleCaseData = res.data.lawyer[0];
          // console.log(this.singleCaseData);
        } else {
          this.toasterService.showErrorToater('No data found, invalid url detected.');
        }
      })
    } else {
      this.toasterService.showErrorToater('No data found, invalid url detected.');
    }
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
}