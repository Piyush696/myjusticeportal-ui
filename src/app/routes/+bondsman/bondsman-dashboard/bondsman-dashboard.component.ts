import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BondsmanService } from 'app/services/bondsman.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-bondsman-dashboard',
  templateUrl: './bondsman-dashboard.component.html',
  styleUrls: ['./bondsman-dashboard.component.css']
})

export class BondsmanDashboardComponent implements OnInit {
  isAuthorized: boolean;
  requestedUser: any;
  constructor(private store: Store<any>, private toasterService: ToasterService, private bondsmanService: BondsmanService) { }

  ngOnInit(): void {
    this.store.select(s => s.userInfo).subscribe(x => {
      if (x.status) {
        this.isAuthorized = true;
      }
      else {
        this.isAuthorized = false;
      }
    });
    this.onGetRequestedUser()
  }

  onGetRequestedUser() {
    this.bondsmanService.getRequestedUser({ status: 'Requested' }).subscribe((res: any) => {
      if (res.data) {
        this.requestedUser = res.data;
      } else {
        this.requestedUser = [];
      }
    })
  }

  onApproveUser(bondsman_userId) {
    this.bondsmanService.approveUser({ bondsman_userId: bondsman_userId }).subscribe((res: any) => {
      if (res.success) {
        this.onGetRequestedUser();
        this.toasterService.showSuccessToater('User approved successfully.');
      } else {
        this.toasterService.showErrorToater('Something went wrong, please try again.');
      }
    });
  }

  onRejectUser(bondsman_userId) {
    this.bondsmanService.rejectUser({ bondsman_userId: bondsman_userId }).subscribe((res: any) => {
      if (res.success) {
        this.onGetRequestedUser();
        this.toasterService.showWarningToater('User rejected successfully.');
      } else {
        this.toasterService.showErrorToater('Something went wrong, please try again.');
      }
    });
  }

}