import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DefenderService } from 'app/services/defender.service';
import { FacilityService } from 'app/services/facility.service';
import { LawyerService } from 'app/services/lawyer.service';
import { ToasterService } from 'app/services/toaster.service';
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
  spinner: boolean;
  isDisabled: boolean = true;
  update: boolean = true;
  custId: any;
  cardForm: FormGroup;
  isDiscount: any;
  cardDetails: any;
  userData: any;

  constructor(private store: Store<any>,private router:Router,  public dialog: MatDialog,private fb: FormBuilder,private toasterService: ToasterService,private defenderService: DefenderService, private lawyerService: LawyerService, private userMetaService: UserMetaService, private facilityService: FacilityService,) { }

  ngOnInit(): void {
    this.getBillableFacility();
    this.getUserDetails();
    this.getUserCardDetails();
    this.createCardControl();
    this.getUserDetailsFromStore()
  }

  alltransactions(){
    this.router.navigateByUrl('/mjp/public-defender/billing-setting/all-transactions')
  }

  getBillableFacility() {
    this.defenderService.getBilliableFacilityDetails().subscribe((data: any) => {
      this.selectedFacilities = data.facilities
      if(this.selectedFacilities[0]?.user_plan?.coupon){
        this.cardForm.get('coupon').setValue(this.selectedFacilities[0]?.user_plan?.coupon)
      }
    })
  }

  getUserDetailsFromStore() {
    this.store.select(s => s.userInfo).subscribe(x => {
      this.userData = x;
    });
  }
  createCardControl() {
    this.cardForm = this.fb.group({
      coupon: ['', this.validateCoupon.bind(this)]
    })
  }

  getUserCardDetails() {
    this.lawyerService.getCardDetails().subscribe((res: any) => {
      this.cardDetails = res.data
    })
  }

  

  async validateCoupon(control: AbstractControl) {
    const result: any = await this.lawyerService.validate_coupan({
      coupon: control.value,
    }).toPromise();
    if (!result.success) {
      if(result.error.name === "UNRECOGNIZED"){
        this.isDiscount = null;
      } else {
        this.isDiscount = null;
      }
      return { invalidCoupon: true };
    } else {
      this.isDiscount = result.data;
      return null;
    }
  }

  
  onOpenChangeCardModal(templateRef){
    let dialogRef = this.dialog.open(templateRef, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  cardChange(event){
    if(event){
      this.getUserCardDetails();
      this.dialog.closeAll();
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

  onPay() {
    this.spinner = true;
    let facilitiesList = [];
    let type = ''
    this.facilityList.filter((ele) => {
      type = 'defender'
      if (ele.isSelected) {
        const facilityData = {
          "facilityId": ele.facilityId,
          "defenderId": this.userData.userId,
          "isSelected": true,
        }
        facilitiesList.push(facilityData)
      }
    })
    let discountPrice:number;
    if(this.isDiscount){
      if(this.isDiscount && this.isDiscount.amount_off != null){
        discountPrice =  this.isDiscount.amount_off / 100
      } else if(this.isDiscount && this.isDiscount.percent_off != null){
        discountPrice = ((this.totalPrice * this.isDiscount.percent_off / 100))
      }
    }
    const data = {
      "userId": this.userData.userId,
      "amount": Math.round(this.totalPrice) * 100,
      "currency": 'usd',
      "interval": 'month',
      "facilityList": facilitiesList,
      "type": type,
      "strip_custId": this.custId,
      "coupon":this.cardForm.get('coupon').value,
      "discount":discountPrice
    }
    this.lawyerService.updatePlan(data).subscribe((res: any) => {
      if (res.success) {
        this.getBillableFacility();
        this.spinner = false;
        this.toasterService.showSuccessToater('Plan updated');
        this.isDisabled = true;
      }
    })
  }

  onEdit() {
    this.isDisabled = false
  }

  startLoader(value) {
    this.spinner = value
  }


}
