import { StatesService } from './../../services/states.service';
import { Component, EventEmitter, OnInit, Output, Input, OnChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  @Input() roleId;

  constructor(private fb: FormBuilder, private _statesService: StatesService) { }

  ngOnInit(): void {
    this.stateData()
    if (!this.orgAddress) {
      this.createFormControl();
    }
    this.countryDisable();
  }
  countryDisable() {
    this.addressForm.get('country').disable()
  }
  stateData() {
    this._statesService.getStates()
      .subscribe(data => {
        this.states = data
      });
  }

  createFormControl() {
    this.organisationForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100), this.validateString.bind(this)]],
      tagline: ['', Validators.maxLength(1000)],
      description: ['', Validators.maxLength(5000)]
    });

    this.addressForm = this.fb.group({
      street1: ['', [Validators.required, Validators.maxLength(100)]],
      street2: ['', [Validators.maxLength(100)]],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      state: ['', [Validators.required, Validators.maxLength(50)]],
      zip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      country: ['United States', [Validators.required, Validators.maxLength(50)]]
    });
  }

  validateString(control: AbstractControl) {
    if (control.value) {
      // const pattern = /^\S*$/;
      // if (!control.value.match(pattern) && control.value !== '') {
      //   return { invalidString: true };
      // }
      // return null;
      if (control.value.startsWith(' ')) {
        return { invalidString: true };;
      }
      if (control.value.endsWith(' ')) {
        return { invalidString: true };
      }
      return null;
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
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
    // data.tagline = this.organisationForm.get('tagline').value;
    // data.description = this.organisationForm.get('description').value;
    data.address = this.addressForm.value;
    data.address['country'] = 'United States';
    this.orgAddressEventEmitter.emit(data);

  }
}