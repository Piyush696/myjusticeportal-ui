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
  facilities = [];
  planPrice: number = 0;
  currentPlanPrice: number = 0;
  totalBillingPrice: number = 0;
  addOnsBillingPrice: number = 0;
  addOnsPrice: number = 0;
  totalPrice: number = 0;
  facilityList = [];
  facilityId: any;
  averageCount: number = 0;
  update: boolean;
  plan: string;
  state = [];

  constructor(private lawyerFacilityService: LawyerFacilityService, private router:Router, private userMetaService: UserMetaService, private facilityService: FacilityService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.getBillableFacility();
  }

  getBillableFacility() {
    this.lawyerFacilityService.getBilliableFacilityDetails().subscribe((data: any) => {
      this.facilities = data.facilities
      let addOnsCount: number = 0
      data.facilities.forEach(element => {
        if (element.planSelected === 'Up to 5 Connections') {
          this.currentPlanPrice = 250
        } else if (element.planSelected === 'Up to 25 Connections') {
          this.currentPlanPrice = 350
        } else if(element.planSelected ==='Unlimited Connections') {
          this.currentPlanPrice = 400
        }

        if (element.isSelected) {
          if (element.isSponsors && element.isPremium) {
            addOnsCount = addOnsCount + ((element.facilityUserCount * 0.25) + (element.facilityUserCount * 1.00))
          } else if (!element.isSponsors && !element.isPremium) {
          }
          else if (!element.isSponsors && element.isPremium) {
            addOnsCount = addOnsCount + element.facilityUserCount * 0.25
          }
          else if (element.isSponsors && !element.isPremium) {
            addOnsCount = addOnsCount + element.facilityUserCount * 1.00
          }
        }
      });
      this.addOnsBillingPrice = addOnsCount
      this.totalBillingPrice =  addOnsCount + this.currentPlanPrice
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

  // onSelectPlan(price) {
  //   this.update = true;
  //   this.totalPrice = parseInt(price);
  //   this.planPrice = parseInt(price)
  //   if (this.planPrice == 250) {
  //     this.plan = 'Up to 5 Connections'
  //   } else if (this.planPrice == 350) {
  //     this.plan = 'Up to 25 Connections'
  //   } else {
  //     this.plan = 'Unlimited Connections'
  //   }
  // }

  onPayEvent(event) {
    this.dialog.closeAll();
    this.getBillableFacility();
  }

  onChangePlan(){
    this.router.navigateByUrl('/mjp/lawyer/billing-setting/update')
  }


  // onFacilitySelect(event, facilityId) {
  //   if (event) {
  //     this.facilityId = facilityId
  //     this.facilities.map((facility) => {
  //       if (facility.facilityId === facilityId) {
  //         facility.isSelected = true;
  //       }
  //       return facility
  //     })
  //   } else {
  //     this.facilities.map((facility) => {
  //       if (facility.facilityId === facilityId) {
  //         facility.isSelected = false;
  //       }
  //       return facility
  //     })
  //   }
  // }

  getUserDetails() {
    this.userMetaService.getUserAdditionalDetails().subscribe((user: any) => {
      user.data.forEach((ele) => {
        if (ele.metaKey == "lawyerInfo") {
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
            ele['isSelected'] = false;
            ele['addOns'] = {
              premium: false,
              sponsors: false
            };
            return ele;
          } else {
            return null;
          }
        })
        this.facilityList = this.facilities.filter(x => x)
      }
    })
  }

  // onSelectAddOns(event, facilityId, addOnsType: string) {
  //   if (event) {
  //     this.facilities.map((x) => {
  //       if (facilityId === x.facilityId) {
  //         if (addOnsType == 'premium') {
  //           x.addOns.premium = true;
  //           this.addOnsPrice = this.addOnsPrice + (x.facilityUserCount * 0.25)
  //           this.totalPrice = this.totalPrice + (x.facilityUserCount * 0.25)
  //         } else if (addOnsType == 'sponsors') {
  //           this.addOnsPrice = this.addOnsPrice + (x.facilityUserCount * 1.00)
  //           this.totalPrice = this.totalPrice + (x.facilityUserCount * 1.00)
  //           x.addOns.sponsors = true;
  //         }
  //       }
  //       return x
  //     });
  //   } else {
  //     this.facilities.map((x) => {
  //       if (facilityId === x.facilityId) {
  //         if (addOnsType == 'premium') {
  //           this.addOnsPrice = this.addOnsPrice - (x.facilityUserCount * 0.25)
  //           this.totalPrice = this.totalPrice - (x.facilityUserCount * 0.25)
  //           x.addOns.premium = false;
  //         } else if (addOnsType == 'sponsors') {
  //           this.addOnsPrice = this.addOnsPrice - (x.facilityUserCount * 1.00)
  //           this.totalPrice = this.totalPrice - (x.facilityUserCount * 1.00)
  //           x.addOns.sponsors = false;
  //         }
  //       }
  //       return x
  //     });
  //   }
  // }

}
