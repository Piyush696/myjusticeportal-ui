import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'app/services/toaster.service';
import { Store } from '@ngrx/store';
import { LegalResearchService } from 'app/services/legal-research.service';
import { UserService } from 'app/services/user.service';
@Component({
  selector: 'app-legal-research-form',
  templateUrl: './legal-research-form.component.html',
  styleUrls: ['./legal-research-form.component.css']
})
export class LegalResearchFormComponent implements OnInit, OnChanges {

  @Input() reSearchDetails: any
  legalForm: FormGroup;
  userData: any;
  userMeta: any;
  buttonText: string = "Submit Form"
  isSentensed: boolean = true;
  isProse:boolean = true;
  otherField:boolean = true;

  arrayList = [{"name": 'Local Law Enforcement Agency'},{"name": ' US Marshall'},{"name": ' US Marshall'},{"name":' ICE/INS'},
  {"name":' Georgia DOC'},{"name":'Federal Bureau of Prisons'},{"name":'Other (Complete next field)'}]

  matterArrayList = [{"name": 'My current charges'},{"name": ' An Appeal i am pursuing'},{"name": 'A Habeas corpus action'},{"name":'A Civil right issue'},
  {"name":'A Condition of Confinement Concern'},{"name":'A Civil issue such as child custody'},{"name":'Some other legal matter'}]

  juridictionList = [{"name": 'Georgia (Criminal)'},{"name": 'Georgia (Civil)'},{"name": 'Federal (Criminal)'},{"name":'Federal (Civil)'},
  {"name":'Administrative'},{"name":'Immigration(ICE)'},{"name":'Other state (Complete next field)'}]
  
  constructor(private toasterService: ToasterService, private router: Router, private fb: FormBuilder,
    private store: Store<any>, private legalResearchService: LegalResearchService, private userService: UserService) { }

  ngOnChanges(): void {
    if (this.reSearchDetails) {
      this.createFormControl()
      this.getUserFromStore()
      this.getSingleUser()
      this.legalForm.get('whoSentYouToJail').setValue(this.reSearchDetails?.whoSentYouToJail);
      this.legalForm.get('nextCourtDate').setValue(this.reSearchDetails?.nextCourtDate);
      this.legalForm.get('currentCharges').setValue(this.reSearchDetails?.currentCharges);
      this.legalForm.get('convicted').setValue(this.reSearchDetails?.convicted);
      this.legalForm.get('sentenced').setValue(this.reSearchDetails?.sentenced);
      this.legalForm.get('researchedMatter').setValue(this.reSearchDetails?.researchedMatter);
      this.legalForm.get('areYou_Pro_se').setValue(this.reSearchDetails?.areYou_Pro_se);
      this.legalForm.get('other').setValue(this.reSearchDetails?.other);
      this.legalForm.get('lawyerRepresentingMatter').setValue(this.reSearchDetails?.lawyerRepresentingMatter);
      this.legalForm.get('selectLawyerRepresenting').setValue(this.reSearchDetails?.selectLawyerRepresenting);
      this.legalForm.get('juridictionLegalMatter').setValue(this.reSearchDetails?.juridictionLegalMatter);
      this.legalForm.get('otherState').setValue(this.reSearchDetails?.otherState);
      this.legalForm.get('information1').setValue(this.reSearchDetails?.information1);
      this.legalForm.get('information2').setValue(this.reSearchDetails?.information2);
      this.legalForm.get('information3').setValue(this.reSearchDetails?.information3);
      this.legalForm.get('information4').setValue(this.reSearchDetails?.information4);
      this.legalForm.get('information5').setValue(this.reSearchDetails?.information5);
      this.buttonText = 'Update Form'
    }
  }

  ngOnInit(): void {
    this.createFormControl()
    this.getSingleUser()
    this.getUserFromStore()
  }

  createFormControl() {
    this.legalForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      inmateId: ['', [Validators.required]],
      housing_unit: ['', [Validators.required]],
      whoSentYouToJail: ['', [Validators.required]],
      nextCourtDate: ['', [Validators.required]],
      currentCharges: ['', [Validators.required]],
      convicted: ['', [Validators.required]],
      sentenced: ['', [Validators.required]],
      researchedMatter: ['', [Validators.required]],
      areYou_Pro_se: ['', [Validators.required]],
      other: ['', [Validators.required]],
      lawyerRepresentingMatter:['',[Validators.required]],
      selectLawyerRepresenting:['',[Validators.required]],
      juridictionLegalMatter:['',[Validators.required]],
      otherState:['',[Validators.required]],
      information1:['',[Validators.required]],
      information2:['',[Validators.required]],
      information3:['',[Validators.required]],
      information4:['',[Validators.required]],
      information5:['',[Validators.required]]
    });
  }

  getUserFromStore() {
    this.store.select(s => s.userInfo).subscribe(user => this.userData = user);
    this.legalForm.get('firstName').setValue(this.userData.firstName);
    this.legalForm.get('middleName').setValue(this.userData?.middleName);
    this.legalForm.get('lastName').setValue(this.userData.lastName);
    this.legalForm.get('inmateId').setValue(this.userData.userId);
    this.legalForm.get('firstName').disable();
    this.legalForm.get('middleName').disable();
    this.legalForm.get('lastName').disable();
    this.legalForm.get('inmateId').disable();
  }

  onLegalForm() {
    if (this.reSearchDetails) {
      this.legalResearchService.updateForm(this.legalForm.value, this.reSearchDetails.legalResearchId).subscribe((res: any) => {
        if (res.success) {
          this.toasterService.showSuccessToater('Form Updated Successfully.');
          this.router.navigateByUrl('/mjp/user/legal-form');
        } else {
          this.toasterService.showErrorToater(res.data);
        }
      }, (error: any) => {
        this.toasterService.showErrorToater(error.statusText);
      })

    } else {
      this.legalResearchService.postForm(this.legalForm.value).subscribe((res: any) => {
        if (res.success) {
          this.toasterService.showSuccessToater('Form Created Successfully.');
          this.router.navigateByUrl('/mjp/user/legal-form');
        } else {
          this.toasterService.showErrorToater(res.data);
        }
      }, (error: any) => {
        this.toasterService.showErrorToater(error.statusText);
      })
    }
  }

  getSingleUser() {
    this.userService.getSingleUser().subscribe((result: any) => {
      this.userMeta = result.data.userMeta
      this.legalForm.get('housing_unit').setValue(result.data.userMeta[0]?.metaValue);
      this.legalForm.get('housing_unit').disable();
    })
  }

  OnConvictedSelect(value) {
    this.isSentensed = JSON.parse(value)
  }

  onProSe(value){
    this.isProse = JSON.parse(value)
  }

  onSelectOther(value){
    if(value.value == 'Other state (Complete next field)'){
      this.otherField = true
    } else {
      this.otherField = false
    }
  }

}

