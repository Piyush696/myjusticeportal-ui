import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { ToasterService } from 'app/services/toaster.service';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})

export class CasesComponent implements OnInit {
  caseList: any;
  sponsorUserList: any;
  caseNoteForm: FormGroup;
  // enableEditBtn: boolean = true;
  currentCaseId: any;
  @ViewChild('modalopen') modalopen: ElementRef

  constructor(private toasterService: ToasterService, public dialog: MatDialog,
    private caseService: CaseService, private fb: FormBuilder, private router: Router, private userAdditionalService: UserAdditionInfoService) {
  }

  ngOnInit(): void {
    this.getCases();
    this.getSponsors();
    this.createCaseNotesForm();
    this.modalopen.nativeElement.click();
  }

  ngAfterViewInit(): void {
    this.modalopen.nativeElement.click();
  }

  createCaseNotesForm() {
    this.caseNoteForm = this.fb.group({
      notes: ['', [Validators.required]]
    })
  }

  getSponsors() {
    this.userAdditionalService.getSponsorUsers().subscribe((sponsorsUser: any) => {
      console.log(sponsorsUser)
      this.sponsorUserList = sponsorsUser.data
    })
  }

  getCases() {
    this.caseService.getCases().subscribe((cases: any) => {
      if (cases.success) {
        this.caseList = cases.data;
      } else {
        this.toasterService.showErrorToater(cases.data);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

  openModal(templateRef, value) {
    this.currentCaseId = value.caseId
    let dialogRef = this.dialog.open(templateRef, {
      width: '55%',
      position: {
        top: '80px',
      }
    });
    this.caseNoteForm.get('notes').setValue(value.notes);
    // this.caseNoteForm.get('notes').disable();
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onSaveChanges() {
    this.caseService.updateCase(this.caseNoteForm.value, this.currentCaseId).subscribe((res: any) => {
      if (res.success) {
        // this.caseNoteForm.disable();
        this.dialog.closeAll();
        this.getCases();
        // this.enableEditBtn = true;
        this.toasterService.showSuccessToater('Notes Updated Successfully.');
      } else {
        this.toasterService.showErrorToater(res.data);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }
  onViewProfile(userId) {
    this.router.navigateByUrl('/mjp/user/lawyer-profile/'+userId)
    // this.router.navigateByUrl('/mjp/user/contact/' + userId)
  }

  onCancelNotesModal() {
    this.dialog.closeAll();
  }
}