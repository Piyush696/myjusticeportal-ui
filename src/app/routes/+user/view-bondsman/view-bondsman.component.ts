import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BondsmanService } from 'app/services/bondsman.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-view-bondsman',
  templateUrl: './view-bondsman.component.html',
  styleUrls: ['./view-bondsman.component.css']
})
export class ViewBondsmanComponent implements OnInit {
  organizationId: any;
  userList: any;
  isHired: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private bondsmanService: BondsmanService, private toasterService: ToasterService) {
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

  onHireBondsman(bondsmanId) {
    let data = {
      bondsmanId
    }
    this.bondsmanService.contactBondsman(data).subscribe((res: any) => {
      if (res.success) {
        this.isHired = true
        this.toasterService.showSuccessToater('User Requested.')

      } else {
        this.isHired = false

        this.toasterService.showErrorToater('User not Requested.')
      }
    })

  }

}
