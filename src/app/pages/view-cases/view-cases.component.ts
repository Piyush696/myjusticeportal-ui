import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';

@Component({
  selector: 'app-view-cases',
  templateUrl: './view-cases.component.html',
  styleUrls: ['./view-cases.component.css']
})
export class ViewCasesComponent implements OnInit {
  caseDetails: any;
  constructor(private router: Router, private route: ActivatedRoute, private caseService: CaseService) {
  }

  ngOnInit(): void {
    this.getCase();
  }

  getCase() {
    this.caseService.getCase(this.route.snapshot.params['caseId']).subscribe((result: any) => {
      this.caseDetails = result.data[0];
    })
  }

  backToCase() {
    let url = '/cases';
    this.router.navigateByUrl(url)
  }



}
