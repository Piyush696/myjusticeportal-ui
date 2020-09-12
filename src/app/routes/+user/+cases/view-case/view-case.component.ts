import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { ToasterService } from 'app/services/toaster.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-case',
  templateUrl: './view-case.component.html',
  styleUrls: ['./view-case.component.scss']
})

export class ViewCaseComponent implements OnInit {
  caseDetails: any;

  constructor(private route: ActivatedRoute, private caseService: CaseService,
    private toasterService: ToasterService, private location: Location) {
  }

  ngOnInit(): void {
    this.getCase();
  }

  getCase() {
    this.caseService.getCase(this.route.snapshot.params['caseId']).subscribe((result: any) => {
      if (result.success) {
        this.caseDetails = result.data;
      }
      else {
        this.toasterService.showErrorToater(result.data);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

  backToCases() {
    this.location.back();
  }
}