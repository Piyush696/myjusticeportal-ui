import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToasterService } from 'app/services/toaster.service';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';
import { FileUploader } from 'ng2-file-upload';
import { SpecialtyService } from 'app/services/specialty.service';
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
  public hasAnotherDropZoneOver: boolean = false;
  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  fileType: string = 'private';
  sharedCaseFiles: any;
  privateCaseFiles: any;
  buttonText: string = 'Edit'
  specialtyList: any;

  constructor(private userAdditionalInfo: UserAdditionInfoService, private router: Router, private fb: FormBuilder,
    private specialtyService: SpecialtyService,public dialog: MatDialog, private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.getAllSpecialty()
    this.getlawyerInfo()
    this.createControl()
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

  getlawyerInfo() {
    this.userAdditionalInfo.getUsers().subscribe((user: any) => {
      console.log(user)
      this.userDetails = user.data
      let name = user?.data?.firstName + user?.data?.middleName + user?.data?.lastName
      this.additionalInfoForm.get('name').setValue(name)
      this.additionalInfoForm.get('tagline').setValue(user?.data?.userAdditionalInfo?.tagline)
      this.additionalInfoForm.get('description').setValue(user?.data?.userAdditionalInfo?.description)
      this.additionalInfoForm.get('practiceAreas').setValue(user?.data?.userAdditionalInfo?.practiceAreas)
      this.additionalInfoForm.disable()
    })
  }

  openOrganizationModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '750px'
    });
  }

  onUploadLogo() {
    if (this.uploader1.queue.length <= 1) {
      let formData = new FormData();
      // formData.append('this.organisationId', this.organisationId);
      this.uploader1.queue.forEach((file) => {
        formData.append('file', file._file);
      })
      formData.append('type', this.fileType);
      this.userAdditionalInfo.uploadFile(formData).subscribe((res) => {
        this.fileType = 'private';
        if (res.success) {
          this.uploader1.queue = [];
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
          "practiceAreas": (this.additionalInfoForm.get('practiceAreas').value).toString()
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
    this.additionalInfoForm.enable();
    this.buttonText = 'Save';
  }

  getAllSpecialty() {
    this.specialtyService.getAllSpecialty().subscribe((res: any) => {
      console.log(res.data)
      this.specialtyList = res.data
    })
  }
  closeModal(){
    this.dialog.closeAll();
  }
}
