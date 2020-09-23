import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-edit-case',
  templateUrl: './edit-case.component.html',
  styleUrls: ['./edit-case.component.scss']
})

export class EditCaseComponent implements OnInit {
  caseDetails: any;

  constructor(private toasterService: ToasterService, private route: ActivatedRoute, private caseService: CaseService) { }

  ngOnInit(): void {
    this.getCase();
  }

  getCase() {
    this.caseService.getCase(this.route.snapshot.params['caseId']).subscribe((result: any) => {
      if (result.success) {
        this.caseDetails = result.data;
      } else {
        this.toasterService.showErrorToater(result.statusText);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }
}