import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-defender-dashboard',
  templateUrl: './defender-dashboard.component.html',
  styleUrls: ['./defender-dashboard.component.css']
})

export class DefenderDashboardComponent implements OnInit {
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