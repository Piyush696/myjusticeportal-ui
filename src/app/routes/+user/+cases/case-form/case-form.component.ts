import { StatesService } from './../../../../services/states.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { ToasterService } from 'app/services/toaster.service';
import { Store } from '@ngrx/store';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.scss']
})

export class CaseFormComponent implements OnInit, OnChanges {
  caseForm: FormGroup;
  buttonText: string = 'Save';
  headerText: string = 'Add  Case';
  userData: any;
  fullName: string;
  @Input() caseDetails;
  public states = [];
  state: any = [];
  dateOfArrest = Date()
  nextCourtDate = new Date(+new Date() + 24 * 60 * 60 * 1000);
  tomorrow = new Date();
  
  constructor(private userService: UserService,private toasterService: ToasterService, private router: Router, private _statesService: StatesService,
    private fb: FormBuilder, private caseService: CaseService, private store: Store<any>) {
  }

  ngOnChanges() {
    if (this.caseDetails) {
      this.createFormControl();
      this.getUserFromStore();
      this.buttonText = 'Save Case';
      this.headerText = 'Edit a Case';
      this.caseForm.get('firstName').setValue(this.fullName);
      this.caseForm.get('legalMatter').setValue(this.caseDetails.legalMatter);
      this.caseForm.get('countyOfArrest').setValue(this.caseDetails.countyOfArrest);
      this.caseForm.get('stateOfArrest').setValue(this.userData.state);
      this.caseForm.get('dateOfArrest').setValue(this.caseDetails.dateOfArrest);
      this.caseForm.get('briefDescriptionOfChargeOrLegalMatter').setValue(this.caseDetails.briefDescriptionOfChargeOrLegalMatter);
      this.caseForm.get('attorneyName').setValue(this.caseDetails.attorneyName);
      this.caseForm.get('nextCourtDate').setValue(this.caseDetails.nextCourtDate);
      // this.caseForm.get('otherInformation').setValue(this.caseDetails.otherInformation);
    }
  }

  ngOnInit(): void {
    this.createFormControl();
    this.getUserFromStore();
    this.stateData();
    this.userState();
    this.getSingleUser();
  }

  getSingleUser() {
    this.userService.getSingleUser().subscribe((user: any) => {
      this.fullName = `${user.data.firstName} ${user.data.middleName ? user.data.middleName : ''} ${user.data.lastName}`;
      this.caseForm.get('firstName').setValue(this.fullName);
      this.caseForm.get('firstName').disable();
    })
  }

  createFormControl() {
    this.caseForm = this.fb.group({
      firstName: ['', [Validators.required]],
      legalMatter: [''],
      countyOfArrest: [''],
      stateOfArrest: [''],
      dateOfArrest: [''],
      briefDescriptionOfChargeOrLegalMatter: [''],
      attorneyName: [''],
      nextCourtDate: [''],
    });
  }


  stateData() {
    this._statesService.getStates()
      .subscribe(data => {
        this.states = data
      });
  }

  userState() {
    this.caseService.getState().subscribe((state: any) => {
      this.caseForm.get('stateOfArrest').setValue(state.data.facilities[0].Address.state)
    });
  }



  getUserFromStore() {
    this.store.select(s => s.userInfo).subscribe(user => this.userData = user);
    // this.fullName = `${this.userData.firstName} ${this.userData.middleName ? this.userData.middleName : ''} ${this.userData.lastName}`;
    // this.caseForm.get('firstName').setValue(this.fullName);
    // this.caseForm.get('firstName').disable();
  }

  updateCase() {
    if (this.caseDetails) {
      this.caseService.updateCase(this.caseForm.value, this.caseDetails.caseId).subscribe((res: any) => {
        if (res.success) {
          this.toasterService.showSuccessToater('Case Updated Successfully.');
          this.router.navigateByUrl('/mjp/user/case');
        }
        else {
          this.toasterService.showErrorToater(res.data);
        }
      }, (error: any) => {
        this.toasterService.showErrorToater(error.statusText);
      })
    }
    else {
      this.caseService.postCase(this.caseForm.value).subscribe((res: any) => {
        if (res.success) {
          this.toasterService.showSuccessToater('Case Created Successfully.');
          this.router.navigateByUrl('/mjp/user/case');
        } else {
          this.toasterService.showErrorToater(res.data);
        }
      }, (error: any) => {
        this.toasterService.showErrorToater(error.statusText);
      })
    }
  }
}