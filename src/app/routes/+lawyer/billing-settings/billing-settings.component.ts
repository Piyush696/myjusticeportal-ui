import { Component, OnInit } from '@angular/core';
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
  totalPrice:number = 0;
  addOnsPrice:number = 0;

  constructor(private lawyerFacilityService:LawyerFacilityService, private facilityService: FacilityService) { }

  ngOnInit(): void {
   this.getBillableFacility();
  }

  getBillableFacility(){
    this.lawyerFacilityService.getBilliableFacilityDetails().subscribe((data:any)=>{
      this.facilities = data.facilities
      data.facilities.forEach(element => {
        if(element.planSelected === 'Up to 5 Connections'){
          this.planPrice =  250
        } else if(element.planSelected === 'Up to 25 Connections'){
          this.planPrice = 350
        } else {
          this.planPrice = 400
        }

        if(element.isSelected === true) {
          this.totalPrice = this.totalPrice + (element.facilityUserCount * 0.10)
        } else if(element.isPremium === true) {
          this.totalPrice = this.totalPrice + (element.facilityUserCount * 0.10)
        }

        if(element.isPremium === true && element.isSponsors === true){
          this.addOnsPrice =  this.addOnsPrice + element.facilityUserCount * 0.25
          this.addOnsPrice =  this.addOnsPrice + element.facilityUserCount * 1.00
          this.totalPrice = this.totalPrice + this.addOnsPrice
        } else if(element.isSponsors === true) {
          this.addOnsPrice =  this.addOnsPrice + element.facilityUserCount * 1.00
          this.totalPrice = this.totalPrice + this.addOnsPrice
        }  else if(element.isPremium === true) {
          this.addOnsPrice =  this.addOnsPrice + element.facilityUserCount * 0.25
          this.totalPrice = this.totalPrice + this.addOnsPrice
        }
      });
    })
  }

}
