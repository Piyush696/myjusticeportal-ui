import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LegalResearchService } from 'app/services/legal-research.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-edit-legal-research-form',
  templateUrl: './edit-legal-research-form.component.html',
  styleUrls: ['./edit-legal-research-form.component.css']
})
export class EditLegalResearchFormComponent implements OnInit {
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
}
