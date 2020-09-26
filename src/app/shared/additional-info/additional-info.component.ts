import { StatesService } from '../../services/states.service';
import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FacilityService } from 'app/services/registration/facility.service';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css']
})
export class AdditionalInfoComponent implements OnInit, OnChanges {

  additionalInfo: FormGroup;

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

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private _statesService: StatesService, private facilityService: FacilityService) {
    this.facilityCode = this.activatedRoute.snapshot.params.facilityCode;
  }

  ngOnInit(): void {

    if (!this.userMeta) {
      this.createFormControl();
      this.additionalInfo.get('facility').setValue(this.facilityCode)
    }
    if (this.roleId == 3) {
      this.fieldName = 'State'
      this.fieldOption = 'Bar info - Exam Id'
      this.stateData()
    }
    else {
      this.fieldName = 'Housing Unit'
      this.fieldOption = 'Facility'
    }
    this.getAllFacilities()
  }
  stateData() {
    this._statesService.getStates()
      .subscribe(data => {
        this.states = data
      });
  }

  ngOnChanges(): void {
    if (this.userMeta && this.roleId !== 3) {
      this.createFormControl();
      this.additionalInfo.get('housing_unit').setValue(this.userMeta[0].metaValue)
      this.additionalInfo.get('facility').setValue(this.userMeta[1].metaValue)
    }
    if (this.userMeta && this.roleId == 3) {
      this.userMeta.forEach(element => {
        let splitArray = element.metaValue.split(":")
        this.createFormControl();
        this.additionalInfo.get('housing_unit').setValue(splitArray[0])
        this.additionalInfo.get('facility').setValue(splitArray[1])
        this.additionalInfo.get('speciality').setValue(splitArray[2])

      });
    }
  }

  createFormControl() {
    this.additionalInfo = this.fb.group({
      housing_unit: ['', [Validators.required]],
      facility: ['', [Validators.required]],
      speciality: ['', [Validators.required]],
    })
  }


  submit() {
    var userMetaList: any
    if (this.roleId == 3) {
      this.lawyerInfoArray.push(this.additionalInfo.value)
      let lawyerInfo = this.lawyerInfoArray.map((item) => {
        let userMetaInfo = {}
        let str = item.housing_unit + ':' + item.facility + ':' + item.speciality
        userMetaInfo['metaKey'] = 'lawyerInfo'
        userMetaInfo['metaValue'] = str

        return userMetaInfo
      })
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
    this.lawyerInfoArray.push(this.additionalInfo.value)
    this.additionalInfo.reset()
  }

}
