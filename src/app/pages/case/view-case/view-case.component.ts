import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-view-case',
  templateUrl: './view-case.component.html',
  styleUrls: ['./view-case.component.scss']
})

export class ViewCaseComponent implements OnInit {
  caseDetails: any;

  constructor(private router: Router, private route: ActivatedRoute,
    private caseService: CaseService, private toasterService: ToasterService) {
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

  editCase() {
    this.router.navigateByUrl('/case/' + this.route.snapshot.params['caseId'] + '/edit');
  }

  onClickViewFiles() {
    this.router.navigateByUrl('/case/' + this.route.snapshot.params['caseId'] + '/files');
  }
}