import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToasterService } from 'app/services/toaster.service';
import { FacilityService } from 'app/services/facility.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']
})

export class FacilityComponent implements OnInit {
  facilityForm: FormGroup;
  buttonText: string = 'Edit';
  addHide: boolean = true;
  facilityId: number;
  addressForm: FormGroup;
  facilityAddressId: number;

  displayedColumns: string[] = ["facilityCode", "facilityName", "ipAddress", "libraryLink", "action"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private toasterService: ToasterService, private facilityService: FacilityService,
    public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.facilityForm = this.fb.group({
      facilityCode: ['', [Validators.required], [this.validateUserNotTaken.bind(this)]],
      facilityName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      ipAddress: ['', [Validators.required, Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
      libraryLink: ['',[Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
    })

    this.addressForm = this.fb.group({
      street1: ['', [Validators.required]],
      street2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      country: ['', [Validators.required]]
    })

    this.getAllFacilities()
  }

  async validateUserNotTaken(control: AbstractControl) {
    const result: any = await this.facilityService.checkFacilityCode(control.value).toPromise();
    if (result.taken) {
      return { taken: true };
    } else {
      return null;
    }
  }

  getAllFacilities() {
    this.facilityService.getAllFacility().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  onDeletefacility(facility) {
    this.facilityService.deleteFacility(facility.facilityId).subscribe((res: any) => {
      if (res.success) {
        this.toasterService.showSuccessToater('Facility successfully deleted.');
        this.getAllFacilities();
      } else {
        this.toasterService.showErrorToater('Facility is not deleted.');
      }
    })
  }

  AddFacility() {
    let facilityDetails = {
      facility: this.facilityForm.value,
      facilityAddress: this.addressForm.value
    }
    this.facilityService.createFacility(facilityDetails).subscribe((res: any) => {
      this.dialog.closeAll();
      if (res.success) {
        this.toasterService.showSuccessToater('Facility successfully Added.');
        this.getAllFacilities();
      } else {
        this.toasterService.showErrorToater('Facility is not Added.');
      }
      this.facilityForm.reset();
      this.addressForm.reset();
    })
  }

  openModal(templateRef, value) {
    this.addHide = value;
    this.buttonText = 'Edit';
    if (value) {
      this.facilityForm.reset();
      this.addressForm.reset();
      this.addressForm.enable();
      this.facilityForm.enable();
    } else {
      this.facilityForm.disable();
      this.addressForm.disable();
    }
    let dialogRef = this.dialog.open(templateRef, {
      width: '80vh',
      height: '75vh'
    })
  }

  facilityView(facility) {
    this.facilityId = facility.facilityId;
    this.facilityForm.get('facilityCode').setValue(facility.facilityCode);
    this.facilityForm.get('facilityName').setValue(facility.facilityName);
    this.facilityForm.get('ipAddress').setValue(facility.ipAddress);
    this.facilityForm.get('libraryLink').setValue(facility.libraryLink);
    if (facility.Address) {
      this.facilityAddressId = facility.Address.addressId;
      this.addressForm.get('street1').setValue(facility.Address.street1);
      this.addressForm.get('street2').setValue(facility.Address.street2);
      this.addressForm.get('city').setValue(facility.Address.city);
      this.addressForm.get('state').setValue(facility.Address.state);
      this.addressForm.get('zip').setValue(facility.Address.zip);
      this.addressForm.get('country').setValue(facility.Address.country);
    }
  }

  onSaveChanges(facility) {
    let facilityDetails = {
      facility: this.facilityForm.value,
      facilityAddress: this.addressForm.value,
      facilityAddressId: this.facilityAddressId
    }

    this.buttonText = 'Edit';
    this.facilityService.updateFacility(facilityDetails, this.facilityId,).subscribe((res: any) => {
      this.dialog.closeAll();
      if (res.success) {
        this.toasterService.showSuccessToater('Facility successfully updated.');
        this.getAllFacilities();
      } else {
        this.toasterService.showErrorToater('Facility is not updated.');
      }
    })
  }

  search(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  // pagination.
  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length > 500)
      return [10, 50, 100, 500, this.dataSource.paginator.length];
    else if (this.dataSource.data.length > 100) {
      return [10, 50, 100, this.dataSource.paginator.length];
    }
    else if (this.dataSource.data.length > 50) {
      return [10, 50, this.dataSource.paginator.length];
    }
    else if (this.dataSource.data.length > 10) {
      return [10, this.dataSource.paginator.length];
    }
    else {
      return [10];
    }
  }
}