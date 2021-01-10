import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToasterService } from 'app/services/toaster.service';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';
import { FileUploader } from 'ng2-file-upload';
import { SpecialtyService } from 'app/services/specialty.service';
import { OrganisationService } from 'app/services/organisation.service';
import { Location } from '@angular/common';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {
  userDetails: any;
  additionalInfoForm: FormGroup;
  public uploader1: FileUploader = new FileUploader({ url: URL });
  public uploader2: FileUploader = new FileUploader({ url: URL });
  public hasAnotherDropZoneOver: boolean = false;
  path: any;
  isFileSizeMax: boolean;
  isHeadshotFileSizeMax: boolean;
  isDimenssionMax: boolean;
  isDimenssionMax1: boolean;
  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  fileType: string = 'private';
  sharedCaseFiles: any;
  privateCaseFiles: any;
  buttonText: string = 'Edit'
  specialtyList: any;
  orgData: any;

  constructor(private userAdditionalInfo: UserAdditionInfoService, private router: Router, private fb: FormBuilder,
    private specialtyService: SpecialtyService, public dialog: MatDialog, private toasterService: ToasterService, private location: Location,
    private organisationService: OrganisationService) { }

  ngOnInit(): void {
    this.getAllSpecialty()
    this.getlawyerInfo()
    this.createControl()
    this.getOrganisationAddress()
  }

  createControl() {
    this.additionalInfoForm = this.fb.group({
      name: ['', [Validators.required]],
      tagline: ['', [Validators.required]],
      description: ['', [Validators.required]],
      practiceAreas: ['', [Validators.required]]
    });
    this.getAllSpecialty();
  }

  filterCases(data: any) {
    if (data) {
      this.sharedCaseFiles = data.filter(data => data.file_case.type == "shared");
      this.privateCaseFiles = data.filter(data => data.file_case.type == "private");
    }
  }

  getOrganisationAddress() {
    this.organisationService.getOrganisationAddressDetails().subscribe((orgDetails: any) => {
      this.orgData = orgDetails.data
    })
  }

  onCloseModal() {
    this.dialog.closeAll();
  }


  getlawyerInfo() {
    this.userAdditionalInfo.getUsers().subscribe((user: any) => {
      this.userDetails = user.data
      let specialty = [];
      if (user.data.userAdditionalInfo.practiceAreas) {
        specialty.push(this.userDetails.userAdditionalInfo.practiceAreas.split(", "))
      }
      this.path = this.userDetails?.userAdditionalInfo?.header?.downloadLink
      let name = user?.data?.firstName + ' ' + user?.data?.middleName + ' ' + user?.data?.lastName
      this.additionalInfoForm.get('name').setValue(name)
      this.additionalInfoForm.get('tagline').setValue(user?.data?.userAdditionalInfo?.tagline)
      this.additionalInfoForm.get('description').setValue(user?.data?.userAdditionalInfo?.description)
      this.additionalInfoForm.get('practiceAreas').setValue(specialty[0])
      this.additionalInfoForm.disable()
    })
  }

  openOrganizationModal(templateRef, userDetails) {
    let name = userDetails.firstName + ' ' + userDetails.middleName + ' ' + userDetails.lastName
    this.additionalInfoForm.get('name').setValue(name)
    this.buttonText = 'Edit'
    this.additionalInfoForm.disable()
    let dialogRef = this.dialog.open(templateRef, {
      width: '800px',
      height: '500px'
    });
    setTimeout(() => {
      var x = document.getElementById('cust-img')
      x.style.background = 'url(' + this.path + ')'
    }, 500);
  }

  onUploadLogo() {
    if (this.uploader1.queue.length <= 1) {
      let formData = new FormData();
      this.uploader1.queue.forEach((file) => {
        formData.append('logo', file._file);
      })
      this.uploader2.queue.forEach((file) => {
        formData.append('header', file._file);
      })
      formData.append('type', this.fileType);
      this.userAdditionalInfo.uploadFile(formData).subscribe((res) => {
        this.fileType = 'private';
        this.getlawyerInfo()
        if (res.success) {
          this.uploader1.queue = [];
          this.uploader2.queue = [];
          this.toasterService.showSuccessToater('File uploaded successfully.');
        } else {
          this.toasterService.showErrorToater(res.data);
        }
      }, (error: any) => {
        this.toasterService.showErrorToater(error.statusText);
      })
    } else {
      this.toasterService.showErrorToater('You can upload only one Logo.');
    }
  }

  saveChanges() {
    if (this.buttonText === 'Save') {
      this.buttonText = 'Edit';
      const data = {
        additionalInfo: {
          "tagline": this.additionalInfoForm.get('tagline').value,
          "description": this.additionalInfoForm.get('description').value,
          "practiceAreas": (this.additionalInfoForm.get('practiceAreas').value).toString().split(',').join(', ')
        }
      }
      this.userAdditionalInfo.updateAdditionalInfo(data).subscribe((updatedOrg: any) => {
        if (updatedOrg.success) {
          this.getlawyerInfo()
          this.toasterService.showSuccessToater('Additional Info updated successfully.');
          this.dialog.closeAll();
          this.additionalInfoForm.disable();
          this.buttonText = 'Edit';
        }
        else {
          this.toasterService.showErrorToater(updatedOrg.data);
        }
      }, (error: any) => {
        this.toasterService.showErrorToater(error.statusText);
      })
    }
    this.additionalInfoForm.get('tagline').enable(),
      this.additionalInfoForm.get('description').enable(),
      this.additionalInfoForm.get('practiceAreas').enable()
    this.buttonText = 'Save';
  }

  getAllSpecialty() {
    this.specialtyService.getAllSpecialty().subscribe((res: any) => {
      this.specialtyList = res.data
    })
  }
  closeModal() {
    this.dialog.closeAll();
  }

  onProfile(file) {
    const maxAllowedSize = 5 * 1024 * 1024
    const height = 300;
    const width = 300;

    if (file[0].size > maxAllowedSize) {
      this.isFileSizeMax = true
    } else {
      this.isFileSizeMax = false
    }
    const Img = new Image();
    const URL = window.URL || window.webkitURL;
    const filesToUpload = (file);
    Img.src = URL.createObjectURL(filesToUpload[0]);
    Img.onload = (e: any) => {
      if (e.path[0].height > height && e.path[0].width > width) {
        this.isDimenssionMax = true
      } else {
        this.isDimenssionMax = false
      }
    }
  }

  onHeadshot(file) {
    const maxAllowedSize = 8 * 1024 * 1024
    const height = 300;
    const width = 550;

    if (file[0].size > maxAllowedSize) {
      this.isHeadshotFileSizeMax = true
    } else {
      this.isHeadshotFileSizeMax = false
    }
    const Img = new Image();
    const URL = window.URL || window.webkitURL;
    const filesToUpload = (file);
    Img.src = URL.createObjectURL(filesToUpload[0]);
    Img.onload = (e: any) => {
      if (e.path[0].height > height && e.path[0].width > width) {
        this.isDimenssionMax1 = true
      } else {
        this.isDimenssionMax1 = false
      }
    }
  }

  onClickGoBack() {
    this.location.back();
  }


}
