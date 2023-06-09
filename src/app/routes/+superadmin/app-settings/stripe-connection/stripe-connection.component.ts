import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService } from 'app/services/stripe.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-stripe-connection',
  templateUrl: './stripe-connection.component.html',
  styleUrls: ['./stripe-connection.component.css']
})

export class StripeConnectionComponent implements OnInit {

  stripeCredentialForm: FormGroup;
  isDisabled: boolean = true;

  constructor(private fb: FormBuilder,private toasterService: ToasterService, private stripeService: StripeService) { }

  ngOnInit(): void {
    this.stripeCredentialForm = this.fb.group({
      authKey: ['', [Validators.required]],
    });
    this.getStripeCredentials();
  }

  getStripeCredentials() {
    this.stripeService.getStripeCredentials().subscribe((credentials: any) => {
      if (credentials.success) {
        this.stripeCredentialForm.get('authKey').setValue(credentials.data.authKey)
        this.stripeCredentialForm.disable();
        this.isDisabled = true;
      }
      else {
        this.toasterService.showErrorToater(credentials.data)
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

  updateTwilioCendencialChanges() {
    this.stripeService.updateStripeCredentials(this.stripeCredentialForm.value).subscribe((updatedData: any) => {
      if (updatedData.success) {
        this.toasterService.showSuccessToater('Stripe Credential updated.')
        this.getStripeCredentials();
      } else {
        this.toasterService.showErrorToater(updatedData.data)
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

  enableSave() {
    this.isDisabled = false;
  }
}
