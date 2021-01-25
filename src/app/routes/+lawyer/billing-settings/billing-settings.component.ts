import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FacilityService } from 'app/services/facility.service';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';
import { UserMetaService } from 'app/services/user-meta.service';
import { LawyerFacilityService } from '../../../services/lawyer-facility.service';
@Component({
  selector: 'app-billing-settings',
  templateUrl: './billing-settings.component.html',
  styleUrls: ['./billing-settings.component.css']
})
export class BillingSettingsComponent implements OnInit {
  billingFacilities = [];
  selectedFacilities = [];
  planPrice: number = 0;
  addOnsPrice: number = 0;
  totalPrice: number = 0;
  facilityList = [];
  facilityId: any;
  averageCount: number = 0;
  update: boolean;
  plan: string;
  state = [];
  isUpdate: boolean;
  spinner: any;
  isDisabled: boolean = true;

  constructor(private lawyerFacilityService: LawyerFacilityService, private router: Router, private userMetaService: UserMetaService, private facilityService: FacilityService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.getBillableFacility();
  }

  getBillableFacility() {
    this.lawyerFacilityService.getBilliableFacilityDetails().subscribe((data: any) => {
      this.selectedFacilities = data.facilities
      let addOnsCount: number = 0
      data.facilities.forEach(element => {
        if (element.planSelected === 'Up to 5 Connections') {
          this.plan = 'Up to 5 Connections'
          this.planPrice = 250
        } else if (element.planSelected === 'Up to 25 Connections') {
          this.plan = 'Up to 25 Connections'
          this.planPrice = 350
        } else if (element.planSelected === 'Unlimited Connections') {
          this.plan = 'Unlimited Connections'
          this.planPrice = 400
        }
        if (element.isPremium && element.isSelected) {
          this.addOnsPrice += (element.facilityUserCount * 0.25)
        }
        if (element.isSponsors && element.isSelected) {
          this.addOnsPrice += (element.facilityUserCount * 1)
        }


      });
      this.totalPrice = this.addOnsPrice + this.planPrice
      this.getAllFacilities();

    })
  }

  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '850px',
      height: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onCloseModal() {
    this.dialog.closeAll();
  }

  onEdit() {
    this.isDisabled = false
  }

  onSelectPlan(price) {
    this.planPrice = 0
    this.totalPrice = parseInt(price) + this.addOnsPrice;
    this.planPrice = parseInt(price)
    if (this.planPrice == 250) {
      this.plan = 'Up to 5 Connections'
    } else if (this.planPrice == 350) {
      this.plan = 'Up to 25 Connections'
    } else {
      this.plan = 'Unlimited Connections'
    }
  }




  onPayEvent(event) {
    this.dialog.closeAll();
    this.getBillableFacility();
  }

  // onChangePlan() {
  //   this.isUpdate = true
  //   // this.router.navigateByUrl('/mjp/lawyer/billing-setting/update')
  // }


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
      this.onSelectAddOns(false, facilityId, 'premium')
      this.onSelectAddOns(false, facilityId, 'sponsors')
    }
  }

  getUserDetails() {
    this.userMetaService.getUserAdditionalDetails().subscribe((user: any) => {
      user.data.forEach((ele) => {
        if (ele.metaKey == "State:Bar") {
          let splitArray = ele.metaValue.split(":")
          this.state.push(splitArray[0].toString());
        }
      })
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
              ele['addOns'] = {
                premium: isFacilitly.isPremium,
                sponsors: isFacilitly.isSponsors
              };
            } else {
              ele['isSelected'] = false;
              ele['addOns'] = {
                premium: false,
                sponsors: false
              };
            }
            return ele;
          }
        })
        this.facilityList = this.facilityList.filter(x => x)
      }
    })
  }

  onSelectAddOns(event, facilityId, addOnsType: string) {
    if (event) {
      this.facilityList.map((x) => {
        if (facilityId === x.facilityId) {
          if (addOnsType == 'premium') {
            x.addOns.premium = true;
            this.addOnsPrice = this.addOnsPrice + (x.facilityUserCount * 0.25)
            this.totalPrice = this.totalPrice + (x.facilityUserCount * 0.25)

          } else if (addOnsType == 'sponsors') {
            this.addOnsPrice = this.addOnsPrice + (x.facilityUserCount * 1.00)
            this.totalPrice = this.totalPrice + (x.facilityUserCount * 1.00)
            x.addOns.sponsors = true;
          }
        }
        return x
      });
    } else {
      this.facilityList.map((x) => {
        if (facilityId === x.facilityId) {
          if (addOnsType == 'premium' && x.addOns.premium) {
            this.addOnsPrice = this.addOnsPrice - (x.facilityUserCount * 0.25)
            this.totalPrice = this.totalPrice - (x.facilityUserCount * 0.25)

            x.addOns.premium = false;
          } else if (addOnsType == 'sponsors' && x.addOns.sponsors) {
            this.addOnsPrice = this.addOnsPrice - (x.facilityUserCount * 1.00)
            this.totalPrice = this.totalPrice - (x.facilityUserCount * 1.00)
            x.addOns.sponsors = false;
          }
        }
        return x
      });
    }
  }

  startLoader(value) {
    this.spinner = value
  }

}
