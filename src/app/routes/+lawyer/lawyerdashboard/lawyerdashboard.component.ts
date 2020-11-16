import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { LawyerService } from 'app/services/lawyer.service';
import { FacilityService } from 'app/services/facility.service';
import { HireLawyerService } from '../../../services/hire-lawyer.service';
import { ToasterService } from 'app/services/toaster.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService } from 'app/services/stripe.service';
import { UserMetaService } from 'app/services/user-meta.service';

@Component({
  selector: 'app-lawyerdashboard',
  templateUrl: './lawyerdashboard.component.html',
  styleUrls: ['./lawyerdashboard.component.scss']
})

export class LawyerdashboardComponent implements OnInit {
  requestedCases: any;
  isAuthorized: boolean;
  showDashboard: boolean;
  billingBoard: boolean = true;
  isDisabled: boolean = true;
  clients: any;
  facilities = [];
  allClients: any;
  count: number = 1;
  step: number;
  displayedColumns: string[] = ["name", "facilities"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  cardForm: FormGroup;
  selectPlanForm: FormGroup;
  userData: any;
  public cardMask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public cvvMask = [/\d/, /\d/, /\d/]
  facilityId: any;
  totalPrice: number = 0
  averageCount: number = 0;
  addOnsCount: number = 0;

  constructor(private hireLawyerService: HireLawyerService, private userMetaService:UserMetaService,
     private facilityService: FacilityService, public dialog: MatDialog,
    private lawyerService: LawyerService, private toasterService: ToasterService, private store: Store<any>, private fb: FormBuilder) { }

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
    this.onGetRequestedCases();
    this.getAllClients();
    this.getALLFacilities();
    this.createCardControl();
    this.getBillingDetails();
  }


  createCardControl() {
    this.cardForm = this.fb.group({
      name: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      valid: ['', [Validators.required]],
      card: ['', [Validators.required, this.cardPatternValidation.bind(this)], this.cardValidation.bind(this)],
    })
    this.cardForm.disable();
  }


  cardPatternValidation(control: AbstractControl) {
    const pattern = /([0-9])$/;
    if (control.value) {
      if (!control.value.match(pattern)) {
        return { invalidCardPattern: true };
      }
      return null;
    }
  }

  async cardValidation(control: AbstractControl) {
    const result: any = await this.lawyerService.validateCard({ number: control.value }).toPromise();
    if (!result.success) {
      return { invalidCard: true };
    } else {
      return null;
    }
  }


  onPay() {
    let x = new Date(this.cardForm.get('valid').value)
    const data = {
      "number": this.cardForm.get('card').value,
      "exp_month": x.getMonth() + 1,
      "exp_year": x.getFullYear(),
      "cvc": this.cardForm.get('cvv').value,
      "email": this.userData.userName
    }
    this.lawyerService.postPay(data).subscribe((addCard: any) => {
      if (addCard.data) {
        const data = {
          "customer": addCard.data.customer,
          "userId": this.userData.userId
        }
        this.lawyerService.subscribePlan(data).subscribe((subscribePlan: any) => {
          if (subscribePlan.data) {
            this.toasterService.showSuccessToater('Subscribe Successfully.')
          } else {
            this.toasterService.showWarningToater('Something went wrong.')
          }
        })
      }
    })
  }


  onFacilitySelect(event, facilityId, averageCount) {
    this.cardForm.enable();
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
      this.onSelectAddOns(false, facilityId, 'premium')
      this.onSelectAddOns(false, facilityId, 'sponsors')
    }
    this.calculatePrice();
  }

  onSelectAddOns(event, facilityId, addOnsType: string) {
    if (event) {
      this.facilities.map((x) => {
        if (facilityId === x.facilityId) {
          if (addOnsType == 'premium') {
            x.addOns.premium = true;

          } else if (addOnsType == 'sponsors') {
            x.addOns.sponsors = true;
          }
        }
        return x
      });
      if (this.addOnsCount < 0) {
        this.addOnsCount = 0
      } else {
        this.addOnsCount++
      }
    } else {
      this.facilities.map((x) => {
        if (facilityId === x.facilityId) {
          if (addOnsType == 'premium') {
            x.addOns.premium = false;
          } else if (addOnsType == 'sponsors') {
            x.addOns.sponsors = false;
          }
        }
        return x
      });
      if (this.addOnsCount < 0) {
        this.addOnsCount = 0;
      } else {
        this.addOnsCount--;
      }
    }
    this.calculatePrice();
  }

  calculatePrice() {
    this.totalPrice = 50;
    this.facilities.forEach((ele) => {
      if (ele.isSelected) {
        this.totalPrice = this.totalPrice + (ele.facilityUserCount * 0.10)
        if (ele.addOns.premium) {
          this.totalPrice = this.totalPrice + 10;
        }
        if (ele.addOns.sponsors) {
          this.totalPrice = this.totalPrice + 10;
        }
      }
    })
  }

  onPayEvent(value) {
    if (value) {
      this.getBillingDetails();
    }
  }

  getBillingDetails(){
    this.userMetaService.getUserBillingDetails().subscribe((billingsDetails:any)=>{
      console.log(billingsDetails)
      if(billingsDetails.data.userMeta){
        billingsDetails.data.userMeta.forEach((x)=>{
          if(x.metaKey == "sub_id" || x.metaKey == "cust_id"){
            console.log('sadas')
            this.showDashboard = true;
            this.billingBoard = false;
          } else {
            this.billingBoard = true;
            this.showDashboard = false;
          }
        })
      }
    })
  }

  onSelectPlan() {
    this.isDisabled = false;
    this.totalPrice = 50;
  }

  openPaymentCardModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
    });
  }

  closeModal() {
    this.dialog.closeAll();
  }

  getAllClients() {
    this.lawyerService.getClients().subscribe((clients: any) => {
      this.clients = clients.data
      this.allClients = clients.data
      this.dataSource = new MatTableDataSource(clients.data);
      this.dataSource.sortingDataAccessor = (item: any, property) => {
        switch (property) {
          case 'name': if (item) return item.firstName + item.middleName + item.lastName;
          case 'facilities': if (item) return item.facilities[0].facilityName;
          default: return item[property];
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  onGetRequestedCases() {
    this.hireLawyerService.getRequestedCases({ status: 'Requested' }).subscribe((res: any) => {
      if (res.data) {
        this.requestedCases = res.data.lawyer;
      } else {
        this.requestedCases = [];
      }
    })
  }

  onFacilityFiltered(facility) {
    this.clients = this.allClients.filter((client) => {
      return client.facilities[0].facilityId == facility.value
    })
    this.dataSource = new MatTableDataSource(this.clients)
  }


  getALLFacilities() {
    this.facilityService.getFacilitiesUserCount().subscribe((facilities: any) => {
      this.facilities = facilities.data.map((ele) => {
        ele['isSelected'] = false;
        ele['addOns'] = {
          premium: false,
          sponsors: false
        };
        return ele
      });
    })
  }


  onApproveCase(lawyer_caseId) {
    this.hireLawyerService.approveCase({ lawyer_caseId: lawyer_caseId }).subscribe((res: any) => {
      if (res.success) {
        this.onGetRequestedCases();
        this.toasterService.showSuccessToater('Case approved successfully.');
      } else {
        this.toasterService.showErrorToater('Something went wrong, please try again.');
      }
    });
  }

  onRejectCase(lawyer_caseId) {
    this.hireLawyerService.rejectCase({ lawyer_caseId: lawyer_caseId }).subscribe((res: any) => {
      if (res.success) {
        this.onGetRequestedCases();
        this.toasterService.showWarningToater('Case rejected successfully.');
      } else {
        this.toasterService.showErrorToater('Something went wrong, please try again.');
      }
    });
  }

  search(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  // pagination.
  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length > 500)
      return [10, 50, 100, 500, this.dataSource.paginator?.length];
    else if (this.dataSource.data.length > 100) {
      return [10, 50, 100, this.dataSource.paginator?.length];
    }
    else if (this.dataSource.data.length > 50) {
      return [10, 50, this.dataSource.paginator?.length];
    }
    else if (this.dataSource.data.length > 10) {
      return [10, this.dataSource.paginator?.length];
    }
    else {
      return [10];
    }
  }
}