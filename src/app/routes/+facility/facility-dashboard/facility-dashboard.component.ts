import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-facility-dashboard',
  templateUrl: './facility-dashboard.component.html',
  styleUrls: ['./facility-dashboard.component.css']
})

export class FacilityDashboardComponent implements OnInit {
  isAuthorized: boolean;
  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.store.select(s => s.userInfo).subscribe(x => {
      if (x.status) {
        this.isAuthorized = true;
      }
      else {
        this.isAuthorized = false;
      }
    });
  }

}