import { Component, EventEmitter, OnInit, Output, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})

export class OrganisationComponent implements OnInit, OnChanges {
  organisationForm: FormGroup;
  addressForm: FormGroup;

  @Input() totalSteps: any;
  @Input() orgAddress: any;
  @Output() orgAddressEventEmitter = new EventEmitter();
  @Output() previousClick = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (!this.orgAddress) {
      this.createFormControl();
    }
  }

  createFormControl() {
    this.organisationForm = this.fb.group({
      name: ['', [Validators.required]],
      tagline: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    this.addressForm = this.fb.group({
      street1: ['', [Validators.required]],
      street2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });
  }

  ngOnChanges(): void {
    if (this.orgAddress) {
      this.createFormControl();
      this.organisationForm.get('name').setValue(this.orgAddress.name)
      this.addressForm.get('street1').setValue(this.orgAddress.address.street1)
      this.addressForm.get('street2').setValue(this.orgAddress.address.street2)
      this.addressForm.get('city').setValue(this.orgAddress.address.city)
      this.addressForm.get('state').setValue(this.orgAddress.address.state)
      this.addressForm.get('zip').setValue(this.orgAddress.address.zip)
      this.addressForm.get('country').setValue(this.orgAddress.address.country)
    }
  }

  onPreviousClick() {
    this.previousClick.emit(true)
  }

  submit() {
    let data: any = {};
    data.name = this.organisationForm.get('name').value;
    data.tagline = this.organisationForm.get('tagline').value;
    data.description = this.organisationForm.get('description').value;
    data.address = this.addressForm.value;
    this.orgAddressEventEmitter.emit(data);
  }
}