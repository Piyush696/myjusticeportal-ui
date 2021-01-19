import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToasterService } from 'app/services/toaster.service';
import { FacilityService } from 'app/services/facility.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { StatesService } from 'app/services/states.service';

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
  states = []
  facility;
  displayedColumns: string[] = ["facilityCode", "facilityName", "state", "facilityUserCount", "ipAddress", "libraryLink", "action"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  currentView: number = 1;

  constructor(private toasterService: ToasterService, private facilityService: FacilityService,
    public dialog: MatDialog, private fb: FormBuilder, private _statesService: StatesService,) { }

  ngOnInit(): void {
    this.facilityForm = this.fb.group({
      facilityCode: ['', [Validators.required], [this.validateUserNotTaken.bind(this)]],
      facilityName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      ipAddress: ['', [Validators.required, Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
      libraryLink: [''],
      facilityUserCount: ['', [Validators.required]],
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
    this.stateData()
  }

  stateData() {
    this._statesService.getStates()
      .subscribe((data: any) => {
        this.states = data
      });
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
    this.addressForm.get('country').disable();
    this.addressForm.get('country').setValue('United States')
    this.facilityService.getAllFacility().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      if (this.dataSource) {
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return this.nestedFilterCheck(currentTerm, data, key);
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
      }
      this.dataSource.sortingDataAccessor = (item: any, property) => {
        switch (property) {
          case 'state': if (item) return item.Address.state;
          default: if (typeof (item[property]) == 'string') {
            return item[property].toLowerCase();
          } else {
            return item[property]
          }
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteFacilityModal(templateRef, facility) {
    this.facility = facility
    let dialogRef = this.dialog.open(templateRef, {
      // width: '500px',
      height: '79%',
      position: {
        top: '10%'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onDeletefacility() {
    this.facilityService.deleteFacility(this.facility.facilityId).subscribe((res: any) => {
      if (res.success) {
        this.dialog.closeAll();
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
    facilityDetails.facilityAddress['country'] = 'United States';
    this.facilityService.createFacility(facilityDetails).subscribe((res: any) => {
      this.dialog.closeAll();
      if (res.success) {
        this.toasterService.showSuccessToater('Facility successfully Added.');
        this.getAllFacilities();
        this.currentView = 1;

      } else {
        this.toasterService.showErrorToater('Facility is not Added.');
        this.currentView = 1;

      }
      this.facilityForm.reset();
      this.addressForm.reset();
    })
  }

  openModal(templateRef, value) {
    this.currentView = 1;
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
      width: '60%',
      height: '80%',
    })
    this.addressForm.get('country').setValue('United States')
    this.addressForm.get('country').disable()
  }

  facilityView(facility) {
    this.facilityId = facility.facilityId;
    this.facilityForm.get('facilityCode').setValue(facility.facilityCode);
    this.facilityForm.get('facilityName').setValue(facility.facilityName);
    this.facilityForm.get('ipAddress').setValue(facility.ipAddress);
    this.facilityForm.get('libraryLink').setValue(facility.libraryLink);
    this.facilityForm.get('facilityUserCount').setValue(facility.facilityUserCount);
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
      this.currentView = 1;
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
    this.dataSource.filterPredicate = (searchValue: any, filter) => {
      const dataStr = JSON.stringify(searchValue).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }

  closeModal() {
    this.dialog.closeAll();
  }
   
  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
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

  OnNextView(val) {
    this.currentView = val
  }

}