import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css']
})
export class AdditionalInfoComponent implements OnInit, OnChanges {

  additionalInfo: FormGroup;

  @Output() userMetaEventEmitter = new EventEmitter();
  @Output() isPreviousClick = new EventEmitter();
  @Input('userName') userName: string;
  @Input() userMeta;
  facilityCode: any;
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.facilityCode = this.activatedRoute.snapshot.params.facilityCode;
  }

  ngOnInit(): void {
    if (!this.userMeta) {
      this.createFormControl();
      this.additionalInfo.get('facility').setValue(this.facilityCode)
    }
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
    })
  }


  submit() {
    var userMetaList = [{ metaKey: 'housing_unit', metaValue: this.additionalInfo.get('housing_unit').value },
    { metaKey: 'facility', metaValue: this.additionalInfo.get('facility').value }]
    this.userMetaEventEmitter.emit(userMetaList);
  }

  onPreviousClick() {
    this.isPreviousClick.emit(true)
  }

}
