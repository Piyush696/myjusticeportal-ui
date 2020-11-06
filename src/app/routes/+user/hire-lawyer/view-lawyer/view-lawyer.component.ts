import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  logo: any;
  specialtyList: any;
  viewCaseForm: FormGroup;

  constructor(private hireLawyerService: HireLawyerService, public dialog: MatDialog,private router: Router,
    private caseService: CaseService, private activatedRoute: ActivatedRoute,
    private toasterService: ToasterService, private fb: FormBuilder) {
    this.organizationId = this.activatedRoute.snapshot.params.organizationId;
  }

  ngOnInit(): void {
    this.createFormControl();
    this.getAllUsers();
    this.getAllCases();
  }

  createFormControl() {
    this.viewCaseForm = this.fb.group({
      notes: ['', [Validators.required]]
    });
  }

  getAllUsers() {
    this.hireLawyerService.getUsersLawyer(this.organizationId).subscribe((users: any) => {
      console.log(users)
      let specialty = [];
      specialty.push(users.data.specialty.split(","))
      this.specialtyList = specialty[0]
      this.orgDetails = users.data
      this.logo = this.orgDetails.logo
    })
  }

  onSelectCaseIds(event, caseId) {
    const data = {
      "caseId":caseId
    }
    if (event) {
      this.selectedCases.push(data);
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
    this.selectedCases=this.selectedCases.map((x)=>{
      x['notes']=this.viewCaseForm.get('notes').value
      return x;
    })
    this.hireLawyerService.setCasesLawyer(this.selectedCases).subscribe((cases: any) => {
      if (cases.success) {
        this.dialog.closeAll();
        this.isHired = true;
        this.toasterService.showSuccessToater('Cases Requested.')
        this.router.navigateByUrl('/mjp/user/case');
      }
      else {
        this.toasterService.showErrorToater('Cases Already Requested by same Lawyer.')
      }
    })
  }
  onContactLawyer(userId) {
    this.router.navigateByUrl('/mjp/user/contact/' + userId)
  }
  closeModal() {
    this.router.navigateByUrl('mjp/user/hire-lawyer')
  }

}
