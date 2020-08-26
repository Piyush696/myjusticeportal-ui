import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})

export class CasesComponent implements OnInit {
  caseList: any;
  caseData: any;

  constructor(private caseService: CaseService, private route: Router) { }

  ngOnInit(): void {
    this.getCases();
  }

  getCases() {
    this.caseService.getCases().subscribe((cases: any) => {
      this.caseList = cases.data;
    })
  }

  onViewCase(caseId) {
    this.route.navigateByUrl('/case/' + caseId);
  }
}