import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FacilityService } from 'app/services/facility.service';
import { UserMetaService } from 'app/services/user-meta.service';

@Component({
  selector: 'app-billing-services',
  templateUrl: './billing-services.component.html',
  styleUrls: ['./billing-services.component.css']
})
export class BillingServicesComponent implements OnInit,AfterViewInit {
  addOnsCount: number = 0;
  planPrice: number = 0;
  addOnsPrice: number = 0;
  facilityId: any;
  totalPrice: number = 0;
  @Input() update:boolean;
  spinner:boolean = false;
  facilities = [];
  state = [];
  filteredFacilityList = [];
  plan: string;
  @Output() paymentConfirm = new EventEmitter()
  
  constructor(private facilityService: FacilityService,private userMetaService: UserMetaService) { }

  ngAfterViewInit(): void {
    // console.log(this.update)
  }

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

  onSelectPlan(price) {
    this.totalPrice = this.totalPrice + parseInt(price) - this.planPrice;

    this.planPrice = parseInt(price)
    if (this.planPrice == 250) {
      this.plan = 'Up to 5 Connections'
    } else if (this.planPrice == 350) {
      this.plan = 'Up to 25 Connections'
    } else {
      this.plan = 'Unlimited Connections'
    }

  }

  onFacilitySelect(event, facilityId) {
    if (event) {
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

  onSelectAddOns(event, facilityId, addOnsType: string) {
    if (event) {
      this.facilities.map((x) => {
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
      this.facilities.map((x) => {
        if (facilityId === x.facilityId) {
          if (addOnsType == 'premium') {
            this.addOnsPrice = this.addOnsPrice - (x.facilityUserCount * 0.25)
            this.totalPrice = this.totalPrice - (x.facilityUserCount * 0.25)
            x.addOns.premium = false;
          } else if (addOnsType == 'sponsors') {
            this.addOnsPrice = this.addOnsPrice - (x.facilityUserCount * 1.00)
            this.totalPrice = this.totalPrice - (x.facilityUserCount * 1.00)
            x.addOns.sponsors = false;
          }
        }
        return x
      });
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

  startLoader(value){
    this.spinner = value
  }

}
