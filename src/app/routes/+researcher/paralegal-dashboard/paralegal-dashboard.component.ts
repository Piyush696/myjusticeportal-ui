import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-paralegal-dashboard',
  templateUrl: './paralegal-dashboard.component.html',
  styleUrls: ['./paralegal-dashboard.component.css']
})

export class ParalegalDashboardComponent implements OnInit {
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