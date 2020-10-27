import { Component, OnInit } from '@angular/core';
import { CaseService } from 'app/services/case.service';
import { HireLawyerService } from 'app/services/hire-lawyer.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  organizationList: any;
  caseList: any;

  constructor(private hireLawyerService: HireLawyerService, private caseService: CaseService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.onGetLaywers();
    this.getCases();
  }

  onGetLaywers() {
    this.hireLawyerService.getOrganization().subscribe((res: any) => {
      console.log(res)
      this.organizationList = res.data;
    })
  }

  getCases() {
    this.caseService.getCases().subscribe((cases: any) => {
      if (cases.success) {
        this.caseList = cases.data;
      } else {
        this.toasterService.showErrorToater(cases.data);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

}
