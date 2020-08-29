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

  displayedColumns: string[] = ["facilityCode", "facilityName", "libraryLinks", "action"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  facility: any;
  facilityForm: FormGroup;
  buttonText: string = 'Edit';
  addHide: boolean = true;
  facilityId: any;

  constructor(private toasterService: ToasterService, private facilityService: FacilityService, public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.facilityForm = this.fb.group({
      facilityCode: ['', [Validators.required]],
      facilityName: ['', [Validators.required]],
      libraryLink: ['', [Validators.required]]
    })
    this.getAllFacilities()
  }

  getAllFacilities() {
    this.facilityService.getAllFacility().subscribe((res: any) => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  search(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
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
    this.facilityService.createFacility(this.facilityForm.value).subscribe((res: any) => {
      this.dialog.closeAll();
      if (res.success) {
        this.toasterService.showSuccessToater('Facility successfully Added.');
        this.getAllFacilities();
      } else {
        this.toasterService.showErrorToater('Facility is not Added.');
      }
      this.facilityForm.reset()
    })
  }

  openModal(templateRef, value) {
    this.addHide = value
    this.buttonText = 'Edit';
    if (value) {
      this.facilityForm.reset()
    } else {
      this.facilityForm.disable()
    }
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
    })
  }

  facilityView(facility) {
    this.facilityId = facility.facilityId
    this.facilityForm.get('facilityCode').setValue(facility.facilityCode)
    this.facilityForm.get('facilityName').setValue(facility.facilityName)
    this.facilityForm.get('libraryLink').setValue(facility.libraryLink)
  }

  onSaveChanges(facility) {
    this.buttonText = 'Edit';
    this.facilityService.updateFacility(this.facilityForm.value, this.facilityId).subscribe((res: any) => {
      this.dialog.closeAll();
      if (res.success) {
        this.toasterService.showSuccessToater('Facility successfully updated.');
        this.getAllFacilities();
      } else {
        this.toasterService.showErrorToater('Facility is not updated.');
      }
    })
  }
}
