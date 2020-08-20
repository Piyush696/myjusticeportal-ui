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
      this.postageCredentialForm.get('apiUrl').setValue(credentials.data.apiUrl)
      this.postageCredentialForm.get('apiKey').setValue(credentials.data.apiKey)
      this.postageCredentialForm.get('project').setValue(credentials.data.project)
      this.postageCredentialForm.get('template').setValue(credentials.data.template)
      this.postageCredentialForm.disable();
    })
  }

  updateCendencialChanges() {
    this.postageService.updateCredentials(this.postageCredentialForm.value).subscribe((updatedData: any) => {
      this.toasterService.showSuccessToater('Postage Credentials updated.')
      this.getPostageCredentials();
    })
  }

}
