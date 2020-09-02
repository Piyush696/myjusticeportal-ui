import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})

export class OrganisationComponent implements OnInit {
  organisationForm: FormGroup;
  addressForm: FormGroup;

  @Output() orgAddressEventEmitter = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.organisationForm = this.fb.group({
      name: ['', [Validators.required]]
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

  submit() {
    let data: any = {};
    data.name = this.organisationForm.value;
    data.address = this.addressForm.value;
    this.orgAddressEventEmitter.emit(data);
  }
}