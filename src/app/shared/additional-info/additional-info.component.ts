import { StatesService } from '../../services/states.service';
import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FacilityService } from 'app/services/registration/facility.service';
import { UserService } from 'app/services/registration/user.service';
import { SpecialtyService } from 'app/services/specialty.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css']
})
export class AdditionalInfoComponent implements OnInit, OnChanges {

  additionalInfo: FormGroup;

  @Output() stateEvent = new EventEmitter();
  @Output() userMetaEventEmitter = new EventEmitter();
  @Output() isPreviousClick = new EventEmitter();
  @Input() userMeta;
  @Input() roleId;
  facilityCode: any;
  fieldName: string = 'Housing Unit';
  fieldOption: string = 'Bar info - Exam Id';
  public states = [];
  facilityList: any;
  lawyerInfoArray: any[] = [];
  additionalInfoLawyer: FormGroup;
  specialtyForm: FormGroup;
  isDisable: boolean = true
  isFacility: boolean;
  currentState = []
  buttonText: string = "Add State"
  specialtyList: any;
  constructor(private toasterService: ToasterService, public dialog: MatDialog, private specialtyService: SpecialtyService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private _statesService: StatesService, private facilityService: FacilityService, private userService: UserService) {
    this.facilityCode = this.activatedRoute.snapshot.params.facilityCode;
  }

  ngOnInit(): void {
    this.specialtyForm = this.fb.group({
      specialty: ['', [Validators.required]]
    })
    if (this.roleId == 1) {
      this.userService.userFacility().subscribe((res: any) => {
        this.isFacility = res.data ? true : false
        if (res.data) {
          this.additionalInfo.get('facility').setValue(res.data)
          this.additionalInfo.get('facility').disable()
        }
        else {
          this.additionalInfo.get('facility').enable()
        }
      })
    }
    this.stateData()
    if (!this.userMeta) {
      this.createFormControl();
      this.createFormControlLawyer()
    }
    this.getAllFacilities()
    this.getAllSpecialty()
  }

  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
    });
  }

  createSpecilaty() {
    const specialtyType = {
      "specialtyType": this.specialtyForm.get('specialty').value
    }
    this.specialtyService.createSpecialty(specialtyType).subscribe((specialty: any) => {
      if (specialty) {
        this.getAllSpecialty();
        this.toasterService.showSuccessToater('Specialty added.')
      }
    })
  }

  stateData() {
    this._statesService.getStates()
      .subscribe(data => {
        this.states = data
      });
  }

  getAllSpecialty() {
    this.specialtyService.getAllSpecialty().subscribe((res: any) => {
      this.specialtyList = res.data
    })
  }

  ngOnChanges(): void {
    if (this.userMeta && this.roleId !== 3) {
      this.createFormControl();
      this.additionalInfo.get('housing_unit').setValue(this.userMeta[0].metaValue)
      this.additionalInfo.get('facility').setValue(this.userMeta[1].metaValue)
    }
    if (this.userMeta && this.roleId == 3) {
      this.isDisable = false
      this.createFormControlLawyer()
      this.lawyerInfoArray = this.userMeta.map((item) => {
        let lawyer = {}
        let splitArray = item.metaValue.split(":")
        lawyer['state'] = splitArray[0],
          lawyer['bar_info_Exam_Id'] = splitArray[1],
          lawyer['speciality'] = splitArray[2]
        return lawyer
      })
    }
  }

  deleteInfo(value) {
    var index = this.lawyerInfoArray.map(function (element) {
      return element.bar_info_Exam_Id;
    }).indexOf(value)
    let info = this.lawyerInfoArray.splice(index, 1)
  }

  createFormControl() {
    this.additionalInfo = this.fb.group({
      housing_unit: ['', [Validators.required]],
      facility: ['', [Validators.required]]
    })
  }

  createFormControlLawyer() {
    this.additionalInfoLawyer = this.fb.group({
      state: ['', [Validators.required]],
      bar_info_Exam_Id: [''],
      speciality: ['', [Validators.required]]
    })
  }


  submit() {
    var userMetaList: any
    if (this.roleId == 3) {
      let lawyerInfo = this.lawyerInfoArray.map((item) => {
        this.currentState.push(item.state)
        let userMetaInfo = {}
        let str = item.state + ':' + item.bar_info_Exam_Id + ':' + item.speciality
        userMetaInfo['metaKey'] = 'lawyerInfo'
        userMetaInfo['metaValue'] = str

        return userMetaInfo
      })
      this.stateEvent.emit(this.currentState)
      userMetaList = lawyerInfo
    }
    else {
      userMetaList = [{ metaKey: 'housing_unit', metaValue: this.additionalInfo.get('housing_unit').value },
      { metaKey: 'facility', metaValue: this.additionalInfo.get('facility').value }]
    }
    this.userMetaEventEmitter.emit(userMetaList);
  }

  onPreviousClick() {
    this.isPreviousClick.emit(true)
  }

  getAllFacilities() {
    this.facilityService.getAllFacility().subscribe((res: any) => {
      this.facilityList = res.data
    })
  }

  addMoreStates() {
    // this.currentState.push(this.additionalInfoLawyer.get('state').value)
    this.lawyerInfoArray.push(this.additionalInfoLawyer.value)
    console.log(this.lawyerInfoArray)
    this.buttonText = "Add Another State License"
    this.isDisable = false
    this.additionalInfoLawyer.reset()
  }

}
