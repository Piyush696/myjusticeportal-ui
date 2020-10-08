import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'app/services/toaster.service';
import { BondsmanService } from 'app/services/bondsman.service';

@Component({
  selector: 'app-accepted-users',
  templateUrl: './accepted-users.component.html',
  styleUrls: ['./accepted-users.component.css']
})
export class AcceptedUsersComponent implements OnInit {
  requestedUser: any[];

  constructor(private toasterService: ToasterService, private bondsmanService: BondsmanService) { }

  ngOnInit(): void {
    this.onGetRequestedUser('Approved')
  }

  onGetRequestedUser(status) {
    this.bondsmanService.getRequestedUser({ status: status }).subscribe((res: any) => {
      if (res.data) {
        this.requestedUser = res.data;
      } else {
        this.requestedUser = [];
      }
    })
  }

  onViewRejectedCases(e) {
    if (e) {
      let statuses = ['Approved', 'Rejected'];
      this.onGetRequestedUser(statuses);
      this.toasterService.showSuccessToater('Showed approved, rejected users.');
    } else {
      this.onGetRequestedUser('Approved');
      this.toasterService.showSuccessToater('Showed approved users only.');
    }
  }


}
