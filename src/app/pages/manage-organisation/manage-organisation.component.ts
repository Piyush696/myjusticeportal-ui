import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OrganisationService } from 'app/services/organisation.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-manage-organisation',
  templateUrl: './manage-organisation.component.html',
  styleUrls: ['./manage-organisation.component.css']
})
export class ManageOrganisationComponent implements OnInit {
  organisationForm: FormGroup;
  inviteMailForm: FormGroup;
  buttonText: string = 'Edit'
  constructor(private fb: FormBuilder, private toasterService: ToasterService, public dialog: MatDialog, private organisationService: OrganisationService) { }

  ngOnInit(): void {
    this.createControl()
    this.getOrganisationAddress()
  }

  getOrganisationAddress() {
    this.organisationService.getOrganisationAddressDetails().subscribe((orgDetails: any) => {
      console.log(orgDetails)
      this.organisationForm.get('name').setValue(orgDetails.data.Organization.name)
      this.organisationForm.get('street1').setValue(orgDetails.data.Organization.Address.street1)
      this.organisationForm.get('street2').setValue(orgDetails.data.Organization.Address.street2)
      this.organisationForm.get('city').setValue(orgDetails.data.Organization.Address.city)
      this.organisationForm.get('state').setValue(orgDetails.data.Organization.Address.state)
      this.organisationForm.get('zip').setValue(orgDetails.data.Organization.Address.zip)
      this.organisationForm.get('country').setValue(orgDetails.data.Organization.Address.country)
      this.organisationForm.disable();
    })
  }

  createControl() {
    this.organisationForm = this.fb.group({
      name: ['', [Validators.required]],
      street1: ['', [Validators.required]],
      street2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      country: ['', [Validators.required]]
    })
    this.createInviteMailFormControl();
  }

  createInviteMailFormControl() {
    this.inviteMailForm = this.fb.group({
      email: ['', [Validators.required, this.validateEmail.bind(this)]]
    })
  }

  validateEmail(control: AbstractControl) {
    const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,15})$/;
    if (!control.value.match(pattern) && control.value !== '') {
      return { invalidEmail: true };
    }
    return null;
  }

  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
    });
  }

  closeModal() {
    this.dialog.closeAll();
  }

  saveChanges() {
    if (this.buttonText === 'Save') {
      this.buttonText = 'Edit';
      console.log('sdcsd')
      const data = {
        organisation: {
          "name": this.organisationForm.get('name').value
        },
        address: {
          "street1": this.organisationForm.get('street1').value,
          "street2": this.organisationForm.get('street2').value,
          "city": this.organisationForm.get('city').value,
          "state": this.organisationForm.get('state').value,
          "country": this.organisationForm.get('country').value,
          "zip": this.organisationForm.get('zip').value,
        }
      }
      console.log(data)
      this.organisationForm.disable();
    }
    this.organisationForm.enable();
    this.buttonText = 'Save';
  }

  onEmailInvite() {
    this.organisationService.inviteUserOrganisation(this.inviteMailForm.get('email').value).subscribe((emailSent: any) => {
      console.log(emailSent)
      if (emailSent.success) {
        this.toasterService.showSuccessToater('Email Sent.')
        this.dialog.closeAll();
      }
    })
  }
}
