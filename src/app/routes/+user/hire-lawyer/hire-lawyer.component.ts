import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { HireLawyerService } from 'app/services/hire-lawyer.service';

@Component({
  selector: 'app-hire-lawyer',
  templateUrl: './hire-lawyer.component.html',
  styleUrls: ['./hire-lawyer.component.scss']
})

export class HireLawyerComponent implements OnInit {
  organizationList: any;

  constructor(private hireLawyerService: HireLawyerService, private caseService: CaseService) { }

  ngOnInit(): void {
    this.onGetLaywers();
  }

  onGetLaywers() {
    this.hireLawyerService.getOrganization().subscribe((res: any) => {
      this.organizationList = res.data;
    })
  }
}