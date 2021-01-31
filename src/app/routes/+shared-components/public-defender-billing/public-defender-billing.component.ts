import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FacilityService } from 'app/services/facility.service';
import { LawyerFacilityService } from 'app/services/lawyer-facility.service';
import { UserMetaService } from 'app/services/user-meta.service';

@Component({
  selector: 'app-public-defender-billing',
  templateUrl: './public-defender-billing.component.html',
  styleUrls: ['./public-defender-billing.component.css']
})
export class PublicDefenderBillingComponent implements OnInit {
  addOnsCount: number = 0;
  planPrice: number = 40;
  addOnsPrice: number = 0;
  facilityId: any;
  totalPrice: number = 40;
  @Input() update: boolean;
  spinner: boolean = false;
  facilities = [];
  state = [];
  filteredFacilityList = [];
  plan: string;
  @Output() paymentConfirm = new EventEmitter()
  isPaybtnDisabled:boolean = true;
  isDiscount: any;
  
  constructor(private facilityService: FacilityService, private userMetaService: UserMetaService,private lawyerFacilityService: LawyerFacilityService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userMetaService.getUserAdditionalDetails().subscribe((user: any) => {
      user.data.forEach((ele) => {
        if (ele.metaKey == "State:Bar") {
          let splitArray = ele.metaValue.split(":")
          this.state.push(splitArray[0].toString());
        }
      })
      this.getALLFacilities();
    })
  }

  onPayEvent(value) {
    if (value) {
      this.paymentConfirm.emit(true)
    }
  }

  onFacilitySelect(event, facilityId) {
    if (event) {
      this.isPaybtnDisabled = false;
      this.facilityId = facilityId
      this.facilities.map((facility) => {
        if (facility.facilityId === facilityId) {
          facility.isSelected = true;
        }
        return facility
      })
    } else {
      this.facilities.map((facility) => {
        if (facility.facilityId === facilityId) {
          facility.isSelected = false;
        }
        return facility
      })
    }
  }

  getALLFacilities() {
    this.facilityService.getFacilitiesUserCount().subscribe((facilities: any) => {
      if (facilities.data) {
        this.facilities = facilities.data.map((ele) => {
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
        this.facilities = this.facilities.filter(x => x)
      }
    })
  }

  couponObj(value){
    console.log(value)
    if(value){
      if(value.name === "UNRECOGNIZED"){
        this.isDiscount = null;
      } else {
        this.isDiscount = value;
      }
    } else {
      this.isDiscount = value;
    }
    console.log(this.isDiscount)
   }
  

  startLoader(value) {
    this.spinner = value
  }

}
