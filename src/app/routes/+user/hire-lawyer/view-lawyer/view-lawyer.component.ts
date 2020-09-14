import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { HireLawyerService } from 'app/services/hire-lawyer.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-view-lawyer',
  templateUrl: './view-lawyer.component.html',
  styleUrls: ['./view-lawyer.component.css']
})
export class ViewLawyerComponent implements OnInit {
  organizationId: any;
  orgDetails: any;
  selectedCases = [];
  caseList: any;
  userId: any;
  isHired: boolean = false;

  constructor(private hireLawyerService: HireLawyerService, public dialog: MatDialog,
    private caseService: CaseService, private activatedRoute: ActivatedRoute,
    private toasterService: ToasterService) {
    this.organizationId = this.activatedRoute.snapshot.params.organizationId;
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllCases();
  }

  getAllUsers() {
    this.hireLawyerService.getUsersLawyer(this.organizationId).subscribe((users: any) => {
      this.orgDetails = users.data
    })
  }

  openModal(templateRef, userId) {
    this.userId = userId
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onSelectCaseIds(event, caseId) {
    if (event) {
      this.selectedCases.push({ caseId });
      this.selectedCases.map((x) => {
        x['lawyerId'] = this.userId
      })
    } else {
      this.selectedCases.forEach((x, i, a) => {
        if (x == caseId) {
          this.selectedCases.splice(i, 1);
        }
      })
    }
  }


  getAllCases() {
    this.caseService.getCases().subscribe((cases: any) => {
      this.caseList = cases.data
    })
  }

  onSubmitCaseIds() {
    this.hireLawyerService.setCasesLawyer(this.selectedCases).subscribe((cases: any) => {
      if (cases.success) {
        this.dialog.closeAll();
        this.isHired = true;
        this.toasterService.showSuccessToater('Cases Requested.')
      }
      else {
        this.toasterService.showErrorToater('Cases not Requested.')
      }
    })
  }

  closeModal() {
    this.dialog.closeAll();
  }

}
