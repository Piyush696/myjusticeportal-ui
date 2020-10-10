import { StatesService } from './../../services/states.service';
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
  public states = [];
  currentState: any;

  constructor(private fb: FormBuilder, private _statesService: StatesService) { }

  ngOnInit(): void {
    this.stateData()
    if (!this.orgAddress) {
      this.createFormControl();
    }
  }
  stateData() {
    this._statesService.getStates()
      .subscribe(data => {
        this.states = data
      });
  }

  createFormControl() {
    this.organisationForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      tagline: ['', Validators.maxLength(1000)],
      description: ['', Validators.maxLength(5000)]
    });

    this.addressForm = this.fb.group({
      street1: ['', [Validators.required, Validators.maxLength(100)]],
      street2: [''],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      state: ['', [Validators.required, Validators.maxLength(50)]],
      zip: ['', [Validators.required, Validators.maxLength(20)]],
      country: ['United States', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnChanges(): void {
    console.log(this.orgAddress)
    if (this.orgAddress) {
      this.createFormControl();
      this.organisationForm.get('name').setValue(this.orgAddress.name)
      this.addressForm.get('street1').setValue(this.orgAddress.address.street1)
      this.addressForm.get('street2').setValue(this.orgAddress.address.street2)
      this.addressForm.get('city').setValue(this.orgAddress.address.city)
      this.addressForm.get('state').setValue(this.orgAddress.address.state)
      this.addressForm.get('zip').setValue(this.orgAddress.address.zip)
      this.addressForm.get('country').setValue(this.orgAddress.address.country)
      this.organisationForm.get('tagline').setValue(this.orgAddress?.tagline)
      this.organisationForm.get('description').setValue(this.orgAddress?.description)
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