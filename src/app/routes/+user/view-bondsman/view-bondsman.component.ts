import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BondsmanService } from 'app/services/bondsman.service';

@Component({
  selector: 'app-view-bondsman',
  templateUrl: './view-bondsman.component.html',
  styleUrls: ['./view-bondsman.component.css']
})
export class ViewBondsmanComponent implements OnInit {
  organizationId: any;
  userList: any;

  constructor(private activatedRoute: ActivatedRoute, private bondsmanService: BondsmanService) {
    this.organizationId = this.activatedRoute.snapshot.params.organizationId
  }

  ngOnInit(): void {
    this.getOrganisations();
  }

  getOrganisations() {
    this.bondsmanService.getBondsmanUser(this.organizationId).subscribe((users: any) => {
      this.userList = users.data.users
    })
  }

}
