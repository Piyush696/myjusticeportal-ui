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
  addressId: any;

  constructor(private fb: FormBuilder, private toasterService: ToasterService,
    public dialog: MatDialog, private organisationService: OrganisationService) { }

  ngOnInit(): void {
    this.createControl()
    this.getOrganisationAddress()
  }

  getOrganisationAddress() {
    this.organisationService.getOrganisationAddressDetails().subscribe((orgDetails: any) => {
      if (orgDetails.success) {
        this.organisationForm.get('name').setValue(orgDetails.data.Organization.name)
        this.organisationForm.get('street1').setValue(orgDetails.data.Organization.Address.street1)
        this.organisationForm.get('street2').setValue(orgDetails.data.Organization.Address.street2)
        this.organisationForm.get('city').setValue(orgDetails.data.Organization.Address.city)
        this.organisationForm.get('state').setValue(orgDetails.data.Organization.Address.state)
        this.organisationForm.get('zip').setValue(orgDetails.data.Organization.Address.zip)
        this.organisationForm.get('country').setValue(orgDetails.data.Organization.Address.country)
        this.addressId = orgDetails.data.Organization.Address.addressId
        this.organisationForm.disable();
      } else {
        this.toasterService.showErrorToater(orgDetails.data);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
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
      userName: ['', [Validators.required, this.validateEmail.bind(this)]],
      isSelfPaid: ['', [Validators.required]]
    })
  }

  validateEmail(control: AbstractControl) {
    const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,15})$/;
    if (control.value) {
      if (!control.value.match(pattern) && control.value !== '') {
        return { invalidEmail: true };
      }
    }
    return null;
  }

  openModal(templateRef) {
    this.inviteMailForm.reset();
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
      const data = {
        organization: {
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
      this.organisationService.updateOrganisation(data, this.addressId).subscribe((updatedOrg: any) => {
        if (updatedOrg.success) {
          this.toasterService.showSuccessToater('Organization updated successfully.');
          this.organisationForm.disable();
          this.buttonText = 'Edit';
        }
        else {
          this.toasterService.showErrorToater(updatedOrg.data);
        }
      }, (error: any) => {
        this.toasterService.showErrorToater(error.statusText);
      })
    }
    this.organisationForm.enable();
    this.buttonText = 'Save';
  }

  onEmailInvite() {
    this.organisationService.inviteUserOrganisation(this.inviteMailForm.value).subscribe((res: any) => {
      if (res.success) {
        this.toasterService.showSuccessToater('Email Sent.');
        this.dialog.closeAll();
      }
      else {
        if (res.data == 'Email exist') {
          this.toasterService.showErrorToater('This email is already exist, please give another!');
        }
        else if (res.data == 'Something went wrong') {
          this.toasterService.showErrorToater('Something went wrong, please try again.');
        }
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }
}