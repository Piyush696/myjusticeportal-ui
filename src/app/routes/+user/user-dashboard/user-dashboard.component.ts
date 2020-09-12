import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})

export class UserDashboardComponent implements OnInit {
  userRole: any;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.store.select(s => s.userInfo).subscribe(x => {
      this.userRole = x.role;
    })
  }
}