import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostageService } from 'app/services/postage.service';
import { ToasterService } from 'app/services/toaster.service';
import { LibraryLinkService } from 'app/services/library-link.service';

@Component({
  selector: 'app-postage-app',
  templateUrl: './postage-app.component.html',
  styleUrls: ['./postage-app.component.css']
})
export class PostageAppComponent implements OnInit {
  postageCredentialForm: FormGroup;
  isDisabled: boolean = true;
  librarylForm: FormGroup;
  isDisabledLink: boolean = true;
  constructor(private fb: FormBuilder, private postageService: PostageService, private toasterService: ToasterService,
    private libraryLinkService: LibraryLinkService) { }

  ngOnInit(): void {
    this.postageCredentialForm = this.fb.group({
      apiUrl: ['', [Validators.required]],
      apiKey: ['', [Validators.required]],
      project: ['', [Validators.required]],
      template: ['', [Validators.required]],
    });
    this.librarylForm = this.fb.group({
      libraryLink: ['', [Validators.required]],
    });
    this.getPostageCredentials();
    this.getLibraryLinks()
  }

  getPostageCredentials() {
    this.postageService.getCredentials().subscribe((credentials: any) => {
      this.postageCredentialForm.get('apiUrl').setValue(credentials.data.apiUrl)
      this.postageCredentialForm.get('apiKey').setValue(credentials.data.apiKey)
      this.postageCredentialForm.get('project').setValue(credentials.data.project)
      this.postageCredentialForm.get('template').setValue(credentials.data.template)
      this.postageCredentialForm.disable();
      this.isDisabled = true;
    })
  }

  updateCendencialChanges() {
    this.postageService.updateCredentials(this.postageCredentialForm.value).subscribe((updatedData: any) => {
      this.toasterService.showSuccessToater('Postage Credentials updated.')
      this.getPostageCredentials();
    })
  }

  getLibraryLinks() {
    this.libraryLinkService.getAllLibraryLink().subscribe(res => {
      this.librarylForm.get('libraryLink').setValue(res['data'].libraryLink)
      this.librarylForm.disable();
      this.isDisabledLink = true;
    })
  }

  updateLink() {
    this.libraryLinkService.updateLibraryLink(this.librarylForm.value).subscribe((updatedData: any) => {
      this.toasterService.showSuccessToater('Library Link updated.')
      this.getLibraryLinks();
    })
  }

  enableSave() {
    this.isDisabled = false;
  }
  enableSaveLink() {
    this.isDisabledLink = false;
  }
}
