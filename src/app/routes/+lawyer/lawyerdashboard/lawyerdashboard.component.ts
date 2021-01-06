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
import { UserMetaService } from 'app/services/user-meta.service';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';


@Component({
  selector: 'app-lawyerdashboard',
  templateUrl: './lawyerdashboard.component.html',
  styleUrls: ['./lawyerdashboard.component.scss']
})

export class LawyerdashboardComponent implements OnInit {
  requestedCases: any;
  isAuthorized: boolean;
  showDashboard: boolean;
  billingBoard: boolean = false;
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
  totalPrice: number = 0;
  averageCount: number = 0;
  addOnsCount: number = 0;
  planPrice: number = 0;
  addOnsPrice: number = 0;
  state = [];
  filteredFacilityList = [];
  lawyerData: any;
  plan: string;

  constructor(private hireLawyerService: HireLawyerService, private userMetaService: UserMetaService,
    private facilityService: FacilityService, public dialog: MatDialog, private userAdditionInfoService: UserAdditionInfoService,
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
    this.getALLFacilities();
    this.getUserDetails();
    this.onGetRequestedCases();
    this.getAllClients();
    this.getBillingDetails();
    this.dashBoardCountData();
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
      this.onSelectAddOns(false, facilityId, 'premium')
      this.onSelectAddOns(false, facilityId, 'sponsors')
    }
    this.calculatePrice();
  }

  onSelectPlan(price, value) {
    this.totalPrice = parseInt(price);
    this.planPrice = parseInt(price)
    if (this.planPrice == 250) {
      this.plan = 'Up to 5 Connections'
    } else if (this.planPrice == 350) {
      this.plan = 'Up to 25 Connections'
    } else {
      this.plan = 'Unlimited Connections'
    }
  }

  onSelectAddOns(event, facilityId, addOnsType: string) {
    if (event) {
      this.facilities.map((x) => {
        if (facilityId === x.facilityId) {
          if (addOnsType == 'premium') {
            x.addOns.premium = true;
            this.addOnsPrice = this.addOnsPrice + x.facilityUserCount * 0.25
            this.totalPrice = this.totalPrice + this.addOnsPrice
          } else if (addOnsType == 'sponsors') {
            this.addOnsPrice = this.addOnsPrice + x.facilityUserCount * 1.00
            this.totalPrice = this.totalPrice + this.addOnsPrice
            x.addOns.sponsors = true;
          }
        }
        return x
      });
    } else {
      this.facilities.map((x) => {
        if (facilityId === x.facilityId) {
          if (addOnsType == 'premium') {
            this.addOnsPrice = this.addOnsPrice - x.facilityUserCount * 0.25
            this.totalPrice = this.totalPrice - this.addOnsPrice
            x.addOns.premium = false;
          } else if (addOnsType == 'sponsors') {
            this.addOnsPrice = this.addOnsPrice - x.facilityUserCount * 1.00
            this.totalPrice = this.totalPrice - this.addOnsPrice
            x.addOns.sponsors = false;
          }
        }
        return x
      });
    }
    this.calculatePrice();
  }

  calculatePrice() {
    this.totalPrice = this.planPrice;
    this.facilities.forEach((ele) => {
      if (ele.isSelected) {
        this.totalPrice = this.totalPrice + (ele.facilityUserCount * 0.10)
        if (ele.addOns.premium) {
          this.totalPrice = this.totalPrice + this.addOnsPrice
        }
        if (ele.addOns.sponsors) {
        }
      }
    })
  }

  onPayEvent(value) {
    if (value) {
      this.getBillingDetails();
    }
  }

  getBillingDetails() {
    this.userMetaService.getUserBillingDetails().subscribe((billingsDetails: any) => {
      if (billingsDetails.data) {
        if (billingsDetails.data.userMeta) {
          if (billingsDetails.data.userMeta.length === 1) {
            this.billingBoard = true;
            this.showDashboard = false;
          } else if (billingsDetails.data.userMeta.length === 0) {
            this.showDashboard = true;
          } else {
            billingsDetails.data.userMeta.forEach((x) => {
              if (x.metaKey == "sub_id" || x.metaKey == "cust_id") {
                this.showDashboard = true;
                this.billingBoard = false;
              } else if (x.metaKey == "lawyerInfo") {
                this.billingBoard = true;
                this.showDashboard = false;
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
      } else {
        this.billingBoard = true;
        this.showDashboard = false;
      }
    })
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


  getUserDetails() {
    this.userMetaService.getUserAdditionalDetails().subscribe((user: any) => {
      user.data.forEach((ele) => {
        if (ele.metaKey == "lawyerInfo") {
          let splitArray = ele.metaValue.split(":")
          this.state.push(splitArray[0].toString());
        }
      })
    })
  }

  getALLFacilities() {
    this.facilityService.getFacilitiesUserCount().subscribe((facilities: any) => {
      if (facilities.data) {
        facilities.data.forEach((ele) => {
          if (ele.Address) {
            this.state.forEach((item) => {
              if (ele.Address.state == item) {
                this.filteredFacilityList.push(ele)
              }
            })
          }
        })
      }
      this.facilities = this.filteredFacilityList.map((ele) => {
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

  dashBoardCountData() {
    this.userAdditionInfoService.getDashboardCounts().subscribe((res: any) => {
      this.lawyerData = res.data
    })
  }
}