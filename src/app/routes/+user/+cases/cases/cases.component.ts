import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { ToasterService } from 'app/services/toaster.service';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';
import { UserMetaService } from 'app/services/user-meta.service';


@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})

export class CasesComponent implements OnInit,AfterViewInit {
  caseList = [];
  sponsorUserList = [];
  caseNoteForm: FormGroup;
  currentCaseId: any;
  count:number = 0;
  @ViewChild('modalopen') modalopen: ElementRef;

  constructor(private toasterService: ToasterService, public dialog: MatDialog,
    private caseService: CaseService, private fb: FormBuilder, private router: Router, 
    private userAdditionalService: UserAdditionInfoService) {
  }

  ngOnInit(): void {
    this.getCases();
    this.getSponsors();
    this.createCaseNotesForm();
    this.modalAcceptDetails();
  }

  modalAcceptDetails(){
    this.userAdditionalService.caseModalDetails().subscribe((res:any) => {
      if(!res.data){
        this.modalopen.nativeElement.click();
      }
    })
  }

  onAcceptClick(){
    let userMeta = { metaKey: 'case_model', metaValue: 'clicked'}
    this.userAdditionalService.caseCreateModal(userMeta).subscribe((res:any) => {
     this.modalAcceptDetails();
   })
  }

  ngAfterViewInit(): void {
       //this.modalopen.nativeElement.click();
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
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onViewLawyer(userId) {
    this.router.navigateByUrl('mjp/user/lawyer-profile/'+userId)
  }


  onSaveChanges() {
    this.caseService.updateCase(this.caseNoteForm.value, this.currentCaseId).subscribe((res: any) => {
      if (res.success) {
        this.dialog.closeAll();
        this.getCases();
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