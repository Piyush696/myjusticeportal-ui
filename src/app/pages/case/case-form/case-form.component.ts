import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { ToasterService } from 'app/services/toaster.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.scss']
})

export class CaseFormComponent implements OnInit, OnChanges {
  caseForm: FormGroup;
  buttonText: string = 'Add Case';
  headerText: string = 'Create a Case';
  userData: any;

  @Input() caseDetails;

  constructor(private toasterService: ToasterService, private router: Router,
    private fb: FormBuilder, private caseService: CaseService, private store: Store<any>) {
  }

  ngOnInit(): void {
    this.store.select(s => s.userInfo).subscribe(user => this.userData = user);

    this.caseForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      countyOfArrest: [''],
      dateOfArrest: [''],
      briefDescriptionOfChargeOrLegalMatter: ['', [Validators.required]],
      attorneyName: [''],
      nextCourtDate: [''],
      otherInformation: ['']
    });

    this.caseForm.get('firstName').setValue(this.userData.firstName);
    this.caseForm.get('lastName').setValue(this.userData.lastName);
    this.caseForm.get('firstName').disable();
    this.caseForm.get('lastName').disable();
  }

  ngOnChanges() {
    if (this.caseDetails) {
      this.buttonText = 'Update Case';
      this.headerText = 'Edit a Case';
      this.caseForm.get('firstName').setValue(this.caseDetails.user.firstName);
      this.caseForm.get('lastName').setValue(this.caseDetails.user.lastName);
      this.caseForm.get('countyOfArrest').setValue(this.caseDetails.countyOfArrest);
      this.caseForm.get('dateOfArrest').setValue(this.caseDetails.dateOfArrest);
      this.caseForm.get('briefDescriptionOfChargeOrLegalMatter').setValue(this.caseDetails.briefDescriptionOfChargeOrLegalMatter);
      this.caseForm.get('attorneyName').setValue(this.caseDetails.attorneyName);
      this.caseForm.get('nextCourtDate').setValue(this.caseDetails.nextCourtDate);
      this.caseForm.get('otherInformation').setValue(this.caseDetails.otherInformation);
    }
  }

  updateCase() {
    if (this.caseDetails) {
      this.caseService.updateCase(this.caseForm.value, this.caseDetails.caseId).subscribe((res: any) => {
        this.toasterService.showSuccessToater('Case Updated Successfully.');
        this.router.navigateByUrl('/case');
      })
    }
    else {
      this.caseService.postCase(this.caseForm.value).subscribe((res: any) => {
        if (res.success) {
          this.toasterService.showSuccessToater('Case Created Successfully.');
          this.router.navigateByUrl('/case');
        }
      })
    }
  }
}