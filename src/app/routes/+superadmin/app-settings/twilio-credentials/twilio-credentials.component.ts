import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostageService } from 'app/services/postage.service';
import { ToasterService } from 'app/services/toaster.service';
import { TwilioService } from 'app/services/twilio.service';

@Component({
  selector: 'app-twilio-credentials',
  templateUrl: './twilio-credentials.component.html',
  styleUrls: ['./twilio-credentials.component.css']
})

export class TwilioCredentialsComponent implements OnInit {
  twilioCredentialForm: FormGroup;
  isDisabled: boolean = true;

  constructor(private fb: FormBuilder, private twilioService: TwilioService,
    private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.twilioCredentialForm = this.fb.group({
      accountSid: ['', [Validators.required]],
      authToken: ['', [Validators.required]],
    });
    this.getTwilioCredentials();
  }

  getTwilioCredentials() {
    this.twilioService.getTwilioCredentials().subscribe((credentials: any) => {
      if (credentials.success) {
        this.twilioCredentialForm.get('accountSid').setValue(credentials.data.accountSid)
        this.twilioCredentialForm.get('authToken').setValue(credentials.data.authToken)
        this.twilioCredentialForm.disable();
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
    this.twilioService.updateTwilioCredentials(this.twilioCredentialForm.value).subscribe((updatedData: any) => {
      if (updatedData.success) {
        this.toasterService.showSuccessToater('Twilio Credentials updated.')
        this.getTwilioCredentials();
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
