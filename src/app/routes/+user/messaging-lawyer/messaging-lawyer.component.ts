import { Component, OnInit } from '@angular/core';
import { HireLawyerService } from 'app/services/hire-lawyer.service';

const SOCKET_ENDPOINT = 'localhost:8810';

@Component({
  selector: 'app-messaging-lawyer',
  templateUrl: './messaging-lawyer.component.html',
  styleUrls: ['./messaging-lawyer.component.css']
})

export class MessagingLawyerComponent implements OnInit {
  organizationList: any;
  orgDetails: any;
  isMessage: boolean;
  lawyerId: any;

  constructor(private hireLawyerService: HireLawyerService) { }

  ngOnInit() {
    this.getOrganizations();
  }

  getOrganizations() {
    this.hireLawyerService.getOrganization().subscribe((res: any) => {
      console.log(res)
      this.organizationList = res.data;
    })
  }

  onSelectOrg(checked, organizationId) {
    if (checked) {
      this.getAllUsers(organizationId)
    } else {
      this.orgDetails = '';
    }
  }

  getAllUsers(organizationId) {
    this.hireLawyerService.getUsersLawyer(organizationId).subscribe((users: any) => {
      this.orgDetails = users.data
    })
  }

  onClicklawyer(lawyerId) {
    this.isMessage = true;
    this.lawyerId = lawyerId
  }

}
