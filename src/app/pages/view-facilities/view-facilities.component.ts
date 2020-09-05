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
  displayedColumns: string[] = ["facilityCode", "facilityName", "action"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  facilityList: any[];
  facilityIds = [];
  originalData: any[];

  constructor(private store: Store<any>, public dialog: MatDialog, private facilityService: FacilityService,
    private toasterService: ToasterService, private organisationService: OrganisationService) { }

  ngOnInit(): void {
    this.getOrgFacilities();
  }

  getOrgFacilities() {
    this.organisationService.getOrganisationFacilities().subscribe((facilities: any) => {
      console.log(facilities)
      this.originalData = facilities.data.facilities;
      this.dataSource = new MatTableDataSource(facilities.data.facilities);
      this.getAllFacility();
      console.log(this.dataSource)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  search(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getAllFacility() {
    this.facilityService.getFacilities().subscribe((facilities: any) => {
      let ids = this.originalData.map(({ facilityId }) => facilityId);
      let includeList = facilities.data.filter(({ facilityId }) => !(ids.includes(facilityId)))
      this.facilityList = includeList.filter((r) => r)
    });
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
      console.log(facilityAdded)
      if (facilityAdded.success) {
        this.getOrgFacilities();
        this.toasterService.showSuccessToater('Facility Added.')
        this.dialog.closeAll()
      }
    })
  }

  onDeleteFacility(facilityId) {
    this.organisationService.removeFacilitiesOrganisation(facilityId).subscribe((facilityRemove: any) => {
      console.log(facilityRemove)
      if (facilityRemove.success) {
        this.getOrgFacilities();
        this.toasterService.showSuccessToater('Facility removed.')
      }
    })
  }

}
