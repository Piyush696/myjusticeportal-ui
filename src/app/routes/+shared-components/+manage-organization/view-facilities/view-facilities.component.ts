import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrganisationService } from 'app/services/organisation.service';
import { ToasterService } from 'app/services/toaster.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FacilityService } from 'app/services/facility.service';

@Component({
  selector: 'app-view-facilities',
  templateUrl: './view-facilities.component.html',
  styleUrls: ['./view-facilities.component.css']
})

export class ViewFacilitiesComponent implements OnInit {
  facilityList: any[];
  facilityIds = [];
  originalData: any[];

  displayedColumns: string[] = ["facilityCode", "facilityName", "action"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog, private facilityService: FacilityService,
    private toasterService: ToasterService, private organisationService: OrganisationService) { }

  ngOnInit(): void {
    this.getOrgFacilities();
  }

  getOrgFacilities() {
    this.organisationService.getOrganisationFacilities().subscribe((facilities: any) => {
      if (facilities.success) {
        this.originalData = facilities.data.facilities;
        this.dataSource = new MatTableDataSource(facilities.data.facilities);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getAllFacility();
      }
      else {
        this.toasterService.showErrorToater(facilities.data)
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
      height: '60vh'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getAllFacility() {
    this.facilityService.getFacilities().subscribe((facilities: any) => {
      if (facilities.success) {
        let ids = this.originalData.map(({ facilityId }) => facilityId);
        let includeList = facilities.data.filter(({ facilityId }) => !(ids.includes(facilityId)))
        this.facilityList = includeList.filter((r) => r)
      }
      else {
        this.toasterService.showErrorToater(facilities.data)
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

  onNativeChange(event, facilityId) {
    if (event) {
      this.facilityIds.push(facilityId);
    } else {
      this.facilityIds.forEach((x, i, a) => {
        if (x == facilityId) {
          this.facilityIds.splice(i, 1);
        }
      })
    }
  }

  onSaveChanges() {
    this.organisationService.addFacilitiesOrganisation(this.facilityIds).subscribe((facilityAdded: any) => {
      if (facilityAdded.success) {
        this.getOrgFacilities();
        this.toasterService.showSuccessToater('Facility Added.')
        this.dialog.closeAll()
      } else {
        this.toasterService.showErrorToater(facilityAdded.data)
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

  onDeleteFacility(facilityId) {
    this.organisationService.removeFacilitiesOrganisation(facilityId).subscribe((facilityRemove: any) => {
      if (facilityRemove.success) {
        this.getOrgFacilities();
        this.toasterService.showSuccessToater('Facility removed.')
      } else {
        this.toasterService.showErrorToater(facilityRemove.data)
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
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