import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';

@Component({
  selector: 'app-view-case',
  templateUrl: './view-case.component.html',
  styleUrls: ['./view-case.component.css']
})

export class ViewCaseComponent implements OnInit {
  caseDetails: any;
  facilityCode: any;

  constructor(private router: Router, private route: ActivatedRoute,
    private caseService: CaseService) {
    this.facilityCode = this.route.snapshot.params.facilityCode;
    console.log(this.facilityCode)
  }

  ngOnInit(): void {
    this.getCase();
  }

  getCase() {
    this.caseService.getCase(this.route.snapshot.params['caseId']).subscribe((result: any) => {
      this.caseDetails = result.data;
    })
  }

  editCase() {
    let url = this.facilityCode + '/case/' + this.route.snapshot.params['caseId'] + '/edit';
    this.router.navigateByUrl(url);
  }

  onClickViewFiles() {
    this.router.navigateByUrl(this.facilityCode + '/case/' + this.route.snapshot.params['caseId'] + '/files');
  }
}