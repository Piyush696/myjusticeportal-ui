import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { HireLawyerService } from 'app/services/hire-lawyer.service';
import { ToasterService } from 'app/services/toaster.service';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  organizationList: any;
  caseList: any;
  userOrg: any;
  lawyerCaseForm: FormGroup;

  constructor(private hireaLawyerService: HireLawyerService, private fb: FormBuilder, private additionalInfoService: UserAdditionInfoService, private activatedRoute: ActivatedRoute, private caseService: CaseService, private toasterService: ToasterService) {
    this.activatedRoute.snapshot.params['userId']
  }

  ngOnInit(): void {
    this.createFormControl();
    this.getCases();
    this.getOrgUser();
  }

  createFormControl() {
    this.lawyerCaseForm = this.fb.group({
      name: ['', [Validators.required]],
      caseId: ['', [Validators.required]]
    });
  }

  getOrgUser() {
    this.additionalInfoService.getSingleUsers(this.activatedRoute.snapshot.params['userId']).subscribe((userOrg: any) => {
      console.log(userOrg)
      this.userOrg = userOrg.data
      this.lawyerCaseForm.get('name').setValue(userOrg.data?.Organization?.name)
      this.lawyerCaseForm.get('name').disable();
    })
  }

  onContactLawyer() {
    const data = {
      "lawyerId": this.userOrg.userId,
      "caseId": this.lawyerCaseForm.get('caseId').value
    }
    this.additionalInfoService.setCasesLawyer(data).subscribe((data: any) => {
      console.log(data)
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

}
