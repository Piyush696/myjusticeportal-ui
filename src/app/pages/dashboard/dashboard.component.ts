import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  userRole: any;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.store.select(s => s.userInfo).subscribe(x => {
      this.userRole = x.role
    })
  };

}
