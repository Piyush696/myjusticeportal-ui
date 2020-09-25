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
    if (this.userMeta) {
      this.createFormControl();
      this.additionalInfo.get('housing_unit').setValue(this.userMeta[0].metaValue)
      this.additionalInfo.get('facility').setValue(this.userMeta[1].metaValue)
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
    if (this.roleId == 3) {
      var userMetaList = [{ metaKey: 'state', metaValue: this.additionalInfo.get('housing_unit').value },
      { metaKey: 'bar Exam Id', metaValue: this.additionalInfo.get('facility').value },
      { metaKey: 'speciality', metaValue: this.additionalInfo.get('speciality').value }]
    }
    else {
      var userMetaList = [{ metaKey: 'housing_unit', metaValue: this.additionalInfo.get('housing_unit').value },
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

}
