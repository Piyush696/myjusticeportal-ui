import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { HireLawyerService } from 'app/services/hire-lawyer.service';
import { ToasterService } from 'app/services/toaster.service';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit {
  organizationList: any;
  caseList = [];
  userOrg: any;
  lawyerCaseForm: FormGroup;
  caseId: number;
  @ViewChild('modalopen') modalopen: ElementRef;

  constructor(private hireaLawyerService: HireLawyerService, private fb: FormBuilder, private additionalInfoService: UserAdditionInfoService,
    private router: Router, private activatedRoute: ActivatedRoute, private caseService: CaseService, private toasterService: ToasterService) {
    this.activatedRoute.snapshot.params['userId']
  }
  ngAfterViewInit(): void {
    this.modalopen.nativeElement.click();
  }

  ngOnInit(): void {
    this.createFormControl();
    this.getCases();
    this.getOrgUser();
  }

  createFormControl() {
    this.lawyerCaseForm = this.fb.group({
      name: ['', [Validators.required]],
      caseId: ['', [Validators.required]],
      notes: ['', [Validators.required]],
      lawyerName: ['', [Validators.required]],
    });
  }

  getOrgUser() {
    this.additionalInfoService.getSingleUsers(this.activatedRoute.snapshot.params['userId']).subscribe((userOrg: any) => {
      this.userOrg = userOrg.data
      this.lawyerCaseForm.get('name').setValue(userOrg.data?.Organization?.name)
      this.lawyerCaseForm.get('lawyerName').setValue(userOrg.data?.firstName + ' ' + userOrg.data?.middleName + ' ' + userOrg.data?.lastName)
      this.lawyerCaseForm.get('name').disable();
      this.lawyerCaseForm.get('lawyerName').disable();
    })
  }

  onContactLawyer() {
    const data = {
      "lawyerId": this.userOrg.userId,
      "caseId": this.lawyerCaseForm.get('caseId').value,
      "notes": this.lawyerCaseForm.get('notes').value
    }
    this.additionalInfoService.setCasesLawyer(data).subscribe((data: any) => {
      if (data.success) {
        this.toasterService.showSuccessToater('Inquiry Sent.');
        this.router.navigateByUrl('/mjp/user/case');
      } else {
        this.toasterService.showWarningToater('Cases Already Requested by the Lawyer.');
      }
    })
  }

  onCaseSelect(caseId) {
    this.caseId = caseId.value
   this.confirmAsignedCase()
  }

  confirmAsignedCase(): boolean {
    let exist: boolean
    this.caseList.find((x) => {
      if (x.caseId === this.caseId) {
        if (x.lawyer.length > 0 && x.lawyer[0].lawyer_case.status === 'Connected') {
          exist = true
        } else {
          exist = false
        }
      }
    })
    return exist
  }

  openModel(){
    this.modalopen.nativeElement.click();
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

}