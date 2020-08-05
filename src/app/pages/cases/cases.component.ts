import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {
  isCreateCase: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  clickBack(back) {
    if (back === true) {
      this.isCreateCase = false;
    }
  }
}
