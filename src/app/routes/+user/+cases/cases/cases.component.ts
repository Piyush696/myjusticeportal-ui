import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

export class CasesComponent implements OnInit,AfterViewInit {
  caseList = [];
  sponsorUserList = [];
  caseNoteForm: FormGroup;
  currentCaseId: any;
  count:number = 0;
  @ViewChild('modalopen') modalopen: ElementRef;
  @ViewChild('secmodalopen') secmodalopen: ElementRef;
  lawyerData: any;
  path: any;

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

  onCloseModal() {
    this.dialog.closeAll();
  }

  modalAcceptDetails(){
    let metaKey = 'case_model'
    this.userAdditionalService.modalDetails(metaKey).subscribe((res:any) => {
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
  
  openSecModel(){
    this.secmodalopen.nativeElement.click();
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

  onViewLawyer(user) {
    console.log(user)
    this.lawyerData = user
    // console.log(user?.userAdditionalInfo?.header?.downloadLink)
    // if(user?.userAdditionalInfo?.header?.downloadLink){
    //   this.path = user?.userAdditionalInfo?.header?.downloadLink
    // } else {
    //   this.path = 'assets/img/LOGO 4.jpg'
    // }
    // console.log(user)
    // setTimeout(() => {
    //   var x = document.getElementById('cust-img')
    //   if(user?.userAdditionalInfo?.header?.downloadLink){
    //     x.style.background = 'url(' + this.path + ')';
    //     x.style.backgroundRepeat= 'no-repeat';
    //   } else {
    //     x.style.background = 'url(' + this.path + ')'
    //     x.style.backgroundColor = '#333442';
    //   }
    // }, 500);
    // this.router.navigateByUrl('mjp/user/lawyer-profile/'+userId)
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