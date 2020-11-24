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
  lawyerData: any;
  path = 'assets/img/75a4c2d1dc2dbce3342109e8270ff4f3.jpg';

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

  openLawyerInfo(templateRef, lawyerData) {
    this.lawyerData = lawyerData
    // this.path = lawyerData?.userAdditionalInfo?.profile?.downloadLink
    let dialogRef = this.dialog.open(templateRef, {
      width: '45%',
      position: {
        top: '80px',
      },
    });
    setTimeout(() => {
      var x = document.getElementById('cust-img')
      x.style.background = 'url(' + this.path + ')'
    }, 500);
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

  onCancelNotesModal() {
    this.dialog.closeAll();
  }

  viewContact(userId){
    this.router.navigateByUrl('mjp/user/contact/'+userId)
    this.dialog.closeAll();
  }

  viewOrg(organizationId){
    this.router.navigateByUrl('mjp/user/hire-lawyer/'+organizationId)
    this.dialog.closeAll();
  }
}