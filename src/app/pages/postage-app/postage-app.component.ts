import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostageService } from 'app/services/postage.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-postage-app',
  templateUrl: './postage-app.component.html',
  styleUrls: ['./postage-app.component.css']
})
export class PostageAppComponent implements OnInit {
  postageCredentialForm: FormGroup;
  isDisabled: boolean = true;
  constructor(private fb: FormBuilder, private postageService: PostageService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.postageCredentialForm = this.fb.group({
      apiUrl: ['', [Validators.required]],
      apiKey: ['', [Validators.required]],
      project: ['', [Validators.required]],
      template: ['', [Validators.required]],
    });
    this.getPostageCredentials();
  }

  getPostageCredentials() {
    this.postageService.getCredentials().subscribe((credentials: any) => {
      if (credentials.success) {
        this.postageCredentialForm.get('apiUrl').setValue(credentials.data.apiUrl)
        this.postageCredentialForm.get('apiKey').setValue(credentials.data.apiKey)
        this.postageCredentialForm.get('project').setValue(credentials.data.project)
        this.postageCredentialForm.get('template').setValue(credentials.data.template)
        this.postageCredentialForm.disable();
        this.isDisabled = true;
      }
      else {
        this.toasterService.showErrorToater(credentials.data)
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

  updateCendencialChanges() {
    this.postageService.updateCredentials(this.postageCredentialForm.value).subscribe((updatedData: any) => {
      if (updatedData.success) {
        this.toasterService.showSuccessToater('Postage Credentials updated.')
        this.getPostageCredentials();
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
