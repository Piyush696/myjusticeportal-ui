import { Component, OnInit } from '@angular/core';
import { BondsmanService } from 'app/services/bondsman.service';

@Component({
  selector: 'app-find-bondsman',
  templateUrl: './find-bondsman.component.html',
  styleUrls: ['./find-bondsman.component.css']
})
export class FindBondsmanComponent implements OnInit {
  organizationList: any;

  constructor(private bondsmanService: BondsmanService) { }

  ngOnInit(): void {
    this.getOrganisations();
  }

  getOrganisations() {
    this.bondsmanService.getBondsmanOrganisation().subscribe((org: any) => {
      this.organizationList = org.data;
    })
  }

}
