import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-history-case',
  templateUrl: './history-case.component.html',
  styleUrls: ['./history-case.component.css']
})
export class HistoryCaseComponent implements OnInit {
  singleCaseData: any;

  constructor(private location: Location, private activatedRoute: ActivatedRoute, private caseService: CaseService,
    private toasterService: ToasterService,) { }

  ngOnInit(): void {
    this.onGetConnectedCaseData();
  }

  onGoBack() {
    this.location.back();
  }

  onGetConnectedCaseData() {
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

}
