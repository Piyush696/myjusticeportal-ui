import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseService } from 'app/services/case.service';

@Component({
  selector: 'app-edit-case',
  templateUrl: './edit-case.component.html',
  styleUrls: ['./edit-case.component.scss']
})

export class EditCaseComponent implements OnInit {
  caseDetails: any;

  constructor(private route: ActivatedRoute, private caseService: CaseService) { }

  ngOnInit(): void {
    this.getCase();
  }

  getCase() {
    this.caseService.getCase(this.route.snapshot.params['caseId']).subscribe((result: any) => {
      this.caseDetails = result.data;
    })
  }
}