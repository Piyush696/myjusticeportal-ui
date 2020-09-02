import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit {
  addressForm: FormGroup;
  @Output() orgAddressEventEmitter = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      name: ['', [Validators.required]],
      street1: ['', [Validators.required]],
      street2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      country: ['', [Validators.required]]
    })
  }

  submit() {
    this.orgAddressEventEmitter.emit(this.addressForm.value)
  }

}
