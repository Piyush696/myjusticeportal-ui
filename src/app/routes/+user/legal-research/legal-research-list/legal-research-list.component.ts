import { Component, OnInit } from '@angular/core';
import { LegalResearchService } from 'app/services/legal-research.service';

@Component({
  selector: 'app-legal-research-list',
  templateUrl: './legal-research-list.component.html',
  styleUrls: ['./legal-research-list.component.css']
})
export class LegalResearchListComponent implements OnInit {
  legalResearch: any;

  constructor(private legalResearchService: LegalResearchService) { }

  ngOnInit(): void {
    this.getAllLegalResearchForms()
  }

  getAllLegalResearchForms() {
    this.legalResearchService.ongetAllLegalForms().subscribe((res: any) => {
      this.legalResearch = res.data
    })
  }
}
