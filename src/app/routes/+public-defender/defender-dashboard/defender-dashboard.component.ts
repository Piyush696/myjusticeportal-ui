import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FacilityService } from 'app/services/facility.service';
import { UserMetaService } from 'app/services/user-meta.service';

@Component({
  selector: 'app-defender-dashboard',
  templateUrl: './defender-dashboard.component.html',
  styleUrls: ['./defender-dashboard.component.css']
})

export class DefenderDashboardComponent implements OnInit {

  isAuthorized: boolean;
  showDashboard: boolean;
  billingBoard: boolean = false;
  facilities = [];
  userData: any;
  totalPrice: number = 40
  averageCount: number = 0;
  facilityId: any;

  constructor(private store: Store<any>,private userMetaService:UserMetaService, private facilityService: FacilityService) { }

  ngOnInit(): void {
    this.store.select(s => s.userInfo).subscribe(x => {
      this.userData = x
      if (x.status) {
        this.isAuthorized = true;
      }
      else {
        this.isAuthorized = false;
      }
    });
    this.getBillingDetails();
    this.getALLFacilities();
  }

  getBillingDetails(){
    this.userMetaService.getUserBillingDetails().subscribe((billingsDetails:any)=>{
      if(billingsDetails.data){
        billingsDetails.data.forEach((ele)=>{
          if(ele.userMeta.length > 1){
            if(ele.userMeta.length === 1){
              this.billingBoard = true;
              this.showDashboard = false;
            } else {
              ele.userMeta.forEach((x)=> {
                if(x.metaKey == "sub_id" || x.metaKey == "cust_id"){
                  this.showDashboard = true;
                  this.billingBoard = false;
                }
                 else {
                  this.billingBoard = true;
                  this.showDashboard = false;
                }
              })
            }
          } else {
            this.billingBoard = true;
            this.showDashboard = false;  
          }
        })
      } else {
        this.billingBoard = true;
        this.showDashboard = false;
      }
    })
  }

  
  onPayEvent(value) {
    if (value) {
      this.getBillingDetails();
    }
  }

  getALLFacilities() {
    this.facilityService.getFacilitiesUserCount().subscribe((facilities: any) => {
      this.facilities = facilities.data.map((ele) => {
        ele['isSelected'] = false;
        return ele
      });
    })
  }

  onFacilitySelect(event, facilityId, averageCount) {
    if (event) {
      this.facilityId = facilityId
      this.facilities.map((facility) => {
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
    }
    this.calculatePrice();
  }

  calculatePrice() {
    this.totalPrice = 50;
    this.facilities.forEach((ele) => {
      if (ele.isSelected) {
        this.totalPrice = this.totalPrice + (ele.facilityUserCount * 0.10)
      }
    })
  }


}