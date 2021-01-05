import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FacilityService } from 'app/services/facility.service';
import { LawyerFacilityService } from '../../../services/lawyer-facility.service';
@Component({
  selector: 'app-billing-settings',
  templateUrl: './billing-settings.component.html',
  styleUrls: ['./billing-settings.component.css']
})
export class BillingSettingsComponent implements OnInit {
  billingFacilities = [];
  facilities = [];
  planPrice:number = 0;
  currentPlanPrice:number = 0;
  totalBillingPrice:number = 0;
  addOnsBillingPrice:number = 0;
  addOnsPrice:number = 0;
  totalPrice:number = 0;
  facilityList = [];
  facilityId: any;
  averageCount: number = 0;

  constructor(private lawyerFacilityService:LawyerFacilityService, private facilityService: FacilityService,public dialog: MatDialog) { }

  ngOnInit(): void {
   this.getBillableFacility();
   this.getALLFacilities();
  }

  getBillableFacility(){
    this.lawyerFacilityService.getBilliableFacilityDetails().subscribe((data:any)=>{
      this.facilities = data.facilities
      data.facilities.forEach(element => {
        if(element.planSelected === 'Up to 5 Connections'){
          this.currentPlanPrice =  250
        } else if(element.planSelected === 'Up to 25 Connections'){
          this.currentPlanPrice = 350
        } else {
          this.currentPlanPrice = 400
        }

        if(element.isSelected === true) {
          this.totalBillingPrice = this.totalBillingPrice + (element.facilityUserCount * 0.10)
        } else if(element.isPremium === true) {
          this.totalBillingPrice = this.totalBillingPrice + (element.facilityUserCount * 0.10)
        }

        if(element.isPremium === true && element.isSponsors === true){
          this.addOnsBillingPrice =  this.addOnsBillingPrice + element.facilityUserCount * 0.25
          this.addOnsBillingPrice =  this.addOnsBillingPrice + element.facilityUserCount * 1.00
          this.totalBillingPrice = this.totalBillingPrice + this.addOnsBillingPrice
        } else if(element.isSponsors === true) {
          this.addOnsBillingPrice =  this.addOnsBillingPrice + element.facilityUserCount * 1.00
          this.totalBillingPrice = this.totalBillingPrice + this.addOnsBillingPrice
        }  else if(element.isPremium === true) {
          this.addOnsBillingPrice =  this.addOnsBillingPrice + element.facilityUserCount * 0.25
          this.totalBillingPrice = this.totalBillingPrice + this.addOnsBillingPrice
        }
      });
    })
  }

  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '800px',
      height:'450px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onCloseModal(){
    this.dialog.closeAll();
  }

  onSelectPlan(price) {
    this.totalPrice = parseInt(price);
    this.planPrice = parseInt(price)
  }

  onFacilitySelect(event, facilityId, averageCount) {
    if (event) {
      this.facilityId = facilityId
      this.facilityList.map((facility) => {
        if (facility.facilityId === facilityId) {
          facility.isSelected = true;
          this.averageCount = this.averageCount + averageCount
        }
        return facility
      })
    } else {
      this.facilities.map((facility) => {
        if (facility.facilityId === facilityId) {
          facility.isSelected = false;
          this.averageCount = this.averageCount - averageCount
        }
        return facility
      })
      this.onSelectAddOns(false, facilityId, 'premium')
      this.onSelectAddOns(false, facilityId, 'sponsors')
    }
    this.calculatePrice();
  }

  getALLFacilities() {
    this.facilityService.getFacilitiesUserCount().subscribe((facilities: any) => {
      // this.facilityList = facilities.data;
      // if (facilities.data) {
      //   facilities.data.forEach((ele) => {
      //     if (ele.Address) {
      //       this.state.forEach((item) => {
      //         if (ele.Address.state == item) {
      //           this.filteredFacilityList.push(ele)
      //         }
      //       })
      //     }
      //   })
      // }
      this.facilityList = facilities.data.map((ele) => {
        ele['isSelected'] = false;
        ele['addOns'] = {
          premium: false,
          sponsors: false
        };
        return ele
      });
    })
  }

  onSelectAddOns(event, facilityId, addOnsType: string) {
    if (event) {
      this.facilityList.map((x) => {
        if (facilityId === x.facilityId) {
          if (addOnsType == 'premium') {
            x.addOns.premium = true;
            this.addOnsPrice =  this.addOnsPrice + x.facilityUserCount * 0.25
             this.totalPrice =   this.totalPrice  + this.addOnsPrice
          } else if (addOnsType == 'sponsors') {
            this.addOnsPrice =  this.addOnsPrice + x.facilityUserCount * 1.00
             this.totalPrice =   this.totalPrice  + this.addOnsPrice
            x.addOns.sponsors = true;
          }
        }
        return x
      });
    } else {
      this.facilityList.map((x) => {
        if (facilityId === x.facilityId) {
          if (addOnsType == 'premium') {
            this.addOnsPrice =  this.addOnsPrice - x.facilityUserCount * 0.25
              this.totalPrice =   this.totalPrice  - this.addOnsPrice 
            x.addOns.premium = false;
          } else if (addOnsType == 'sponsors') {
           this.addOnsPrice =  this.addOnsPrice - x.facilityUserCount * 1.00
             this.totalPrice =   this.totalPrice  - this.addOnsPrice
            x.addOns.sponsors = false;
          }
        }
        return x
      });
    }
    this.calculatePrice();
  }

  calculatePrice() {
    this.totalPrice =  this.planPrice;
    this.facilityList.forEach((ele) => {
      if (ele.isSelected) {
        this.totalPrice = this.totalPrice + (ele.facilityUserCount * 0.10)
        if (ele.addOns.premium) {
          this.totalPrice  =   this.totalPrice  + this.addOnsPrice
        }
        if (ele.addOns.sponsors) {
        }
      }
    })
  }

}
