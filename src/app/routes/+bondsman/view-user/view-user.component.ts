import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BondsmanService } from 'app/services/bondsman.service';
import { Location } from '@angular/common';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  singleUserData: any;

  constructor(private activatedRoute: ActivatedRoute,
    private toasterService: ToasterService, private location: Location, private bondsmanService: BondsmanService) { }

  ngOnInit(): void {
    this.onGetUserData()
  }

  onGetUserData() {
    if (this.activatedRoute.snapshot.params['bondsman_userId']) {
      this.bondsmanService.getRequestedCUserById(this.activatedRoute.snapshot.params['bondsman_userId']).subscribe((res: any) => {
        if (res.data) {
          this.singleUserData = res.data;
        } else {
          this.toasterService.showErrorToater('No data found, invalid url detected.');
        }
      })
    } else {
      this.toasterService.showErrorToater('No data found, invalid url detected.');
    }
  }


  onGoBack() {
    this.location.back();
  }

}
