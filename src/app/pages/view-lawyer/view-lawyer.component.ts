import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CaseService } from 'app/services/case.service';

@Component({
  selector: 'app-view-lawyer',
  templateUrl: './view-lawyer.component.html',
  styleUrls: ['./view-lawyer.component.css']
})
export class ViewLawyerComponent implements OnInit {
  organizationId: any;
  orgDetails: any;
  cases = [];
  caseList: any;

  constructor(public dialog: MatDialog, private caseService: CaseService, private activatedRoute: ActivatedRoute) {
    this.organizationId = this.activatedRoute.snapshot.params.organizationId;
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.caseService.getuserLawyers(this.organizationId).subscribe((users: any) => {
      console.log(users)
      this.orgDetails = users.data
    })
    this.getAllCases();
  }

  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onNativeChange(event, caseId) {
    if (event) {
      this.cases.push(caseId);
    } else {
      this.cases.forEach((x, i, a) => {
        if (x == caseId) {
          this.cases.splice(i, 1);
        }
      })
    }
    console.log(this.cases)
  }

  getAllCases() {
    this.caseService.getCases().subscribe((cases: any) => {
      console.log(cases)
      this.caseList = cases.data
    })
  }

}
