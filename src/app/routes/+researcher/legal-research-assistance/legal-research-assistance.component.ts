import { Component, OnInit } from '@angular/core';
import { LegalResearchService } from 'app/services/legal-research.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-legal-research-assistance',
  templateUrl: './legal-research-assistance.component.html',
  styleUrls: ['./legal-research-assistance.component.css']
})
export class LegalResearchAssistanceComponent implements OnInit {
  legalFormList = []
  constructor(private legalResearchService: LegalResearchService,    private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.getAllLegalResearchForm()
  }

  getAllLegalResearchForm() {
    this.legalResearchService.ongetAllLegalForms().subscribe((result: any) => {
      if (result.success) {
        this.legalFormList = result.data;
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
