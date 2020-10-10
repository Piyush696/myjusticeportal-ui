import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LegalResearchService } from 'app/services/legal-research.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-legal-research-form-view',
  templateUrl: './legal-research-form-view.component.html',
  styleUrls: ['./legal-research-form-view.component.css']
})
export class LegalResearchFormViewComponent implements OnInit {
  reSearchDetails: any;

  constructor(private legalResearchService: LegalResearchService, private router: Router, private route: ActivatedRoute,
    private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.getSingleFormData()
  }

  getSingleFormData() {
    this.legalResearchService.ongetSingleLegalForms(this.route.snapshot.params['legalResearchId']).subscribe((result: any) => {
      if (result.success) {
        this.reSearchDetails = result.data;
      }
      else {
        this.toasterService.showErrorToater(result.data);
      }
      (error: any) => {
        this.toasterService.showErrorToater(error.statusText);
      }
    })
  }

  backToFormList() {
    this.router.navigateByUrl('/mjp/user/legal-form')
  }

}
