import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BondsmanService } from 'app/services/bondsman.service';

@Component({
  selector: 'app-find-bondsman',
  templateUrl: './find-bondsman.component.html',
  styleUrls: ['./find-bondsman.component.css']
})
export class FindBondsmanComponent implements OnInit {
  organizationList: any;

  constructor(private bondsmanService: BondsmanService, private router: Router) { }

  ngOnInit(): void {
    this.getOrganisations();
  }

  getOrganisations() {
    this.bondsmanService.getBondsmanOrganisation().subscribe((org: any) => {
      this.organizationList = org.data;
    })
  }

  onViewClick(organzationId) {
    let _url = '/mjp/user/organization/' + organzationId
    this.router.navigateByUrl(_url)
  }

}
