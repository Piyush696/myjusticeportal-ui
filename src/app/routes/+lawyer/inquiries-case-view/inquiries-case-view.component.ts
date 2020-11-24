import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'app/services/toaster.service';
import { Location } from '@angular/common';
import { HireLawyerService } from 'app/services/hire-lawyer.service';

@Component({
  selector: 'app-inquiries-case-view',
  templateUrl: './inquiries-case-view.component.html',
  styleUrls: ['./inquiries-case-view.component.css']
})
export class InquiriesCaseViewComponent implements OnInit {
  singleCaseData: any;

  constructor(private hireLawyerService: HireLawyerService, private activatedRoute: ActivatedRoute,
    private location: Location, private toasterService: ToasterService,) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params['caseId'])
    this.onGetCaseData();
  }

  onGetCaseData() {
    if (this.activatedRoute.snapshot.params['caseId']) {
      this.hireLawyerService.getCase(this.activatedRoute.snapshot.params['caseId']).subscribe((res: any) => {
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

  onGoBack() {
    this.location.back();
  }

}
