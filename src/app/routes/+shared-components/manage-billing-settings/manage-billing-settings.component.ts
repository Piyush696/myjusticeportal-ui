import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DefenderService } from 'app/services/defender.service';
import { FacilityService } from 'app/services/facility.service';
import { UserMetaService } from 'app/services/user-meta.service';

@Component({
  selector: 'app-manage-billing-settings',
  templateUrl: './manage-billing-settings.component.html',
  styleUrls: ['./manage-billing-settings.component.css']
})
export class ManageBillingSettingsComponent implements OnInit {
  selectedFacilities = [];
  planPrice: number = 40;
  totalPrice: number = 40;
  state = [];
  facilityList = [];
  facilityId: any;
  spinner: any;
  isDisabled: boolean = true;
  update: boolean = true;
  constructor(private defenderService: DefenderService, private userMetaService: UserMetaService, private facilityService: FacilityService,) { }

  ngOnInit(): void {
    this.getBillableFacility();
    this.getUserDetails();
  }

  getBillableFacility() {
    this.defenderService.getBilliableFacilityDetails().subscribe((data: any) => {
      this.selectedFacilities = data.facilities
    })
  }

  onPayEvent(event) {
    this.isDisabled = true;
    this.getBillableFacility();
  }


  getUserDetails() {
    this.userMetaService.getUserAdditionalDetails().subscribe((user: any) => {
      user.data.forEach((ele) => {
        if (ele.metaKey == "State:Bar") {
          let splitArray = ele.metaValue.split(":")
          this.state.push(splitArray[0].toString());
        }
      })
      this.getAllFacilities();
    })
  }

  getAllFacilities() {
    this.facilityService.getFacilitiesUserCount().subscribe((facilities: any) => {
      if (facilities.data) {
        this.facilityList = facilities.data.map((ele) => {
          if (this.state.includes(ele.Address.state)) {
            const isFacilitly = this.selectedFacilities.find(x => x.facilityId === ele.facilityId)
            if (isFacilitly) {
              ele['isSelected'] = isFacilitly.isSelected;
            } else {
              ele['isSelected'] = false;
            }
            return ele;
          }
        })
        this.facilityList = this.facilityList.filter(x => x)
      }
    })
  }

  onFacilitySelect(event, facilityId) {
    if (event) {
      this.facilityId = facilityId
      this.facilityList = this.facilityList.map((facility) => {
        if (facility.facilityId === facilityId) {
          facility.isSelected = true;
        }
        return facility
      })
    } else {
      this.facilityList.map((facility) => {
        if (facility.facilityId === facilityId) {
          facility.isSelected = false;
        }
        return facility
      })
    }
  }

  onEdit() {
    this.isDisabled = false
  }

  startLoader(value) {
    this.spinner = value
  }


}
