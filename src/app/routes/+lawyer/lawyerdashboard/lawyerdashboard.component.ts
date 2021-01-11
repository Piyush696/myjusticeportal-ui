import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { LawyerService } from 'app/services/lawyer.service';
import { HireLawyerService } from '../../../services/hire-lawyer.service';
import { ToasterService } from 'app/services/toaster.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { UserMetaService } from 'app/services/user-meta.service';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lawyerdashboard',
  templateUrl: './lawyerdashboard.component.html',
  styleUrls: ['./lawyerdashboard.component.scss']
})

export class LawyerdashboardComponent implements OnInit, AfterViewInit {
  requestedCases: any;
  isAuthorized: boolean;
  showDashboard: boolean;
  billingBoard: boolean = false;
  isDisabled: boolean = true;
  clients: any;

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

  lawyerData: any;
  @ViewChild('modalopen') modalopen: ElementRef;
  modalopens: any;

  constructor(private hireLawyerService: HireLawyerService, private userMetaService: UserMetaService, private router: Router, public dialog: MatDialog, private userAdditionInfoService: UserAdditionInfoService,
    private lawyerService: LawyerService, private toasterService: ToasterService, private store: Store<any>) { }

  ngAfterViewInit(): void {
    this.getModal();
  }

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

    // this.getUserDetails();
    this.onGetRequestedCases();
    this.getAllClients();
    this.getBillingDetails();
    this.dashBoardCountData();
  }


  getModal() {
    this.userMetaService.getmodalData({ metaKey: 'choosePlanModal' }).subscribe((res: any) => {
      if (!res.data) {
        this.modalopen.nativeElement.click();
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
              } else if (x.metaKey == "State:Bar") {
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

  onchoosePlan() {
    this.userMetaService.modalDataEvent({ metaKey: 'choosePlanModal', metaValue: true }).subscribe()
  }

  redirect() {
    this.router.navigateByUrl('mjp/lawyer/manage-profile')
  }
}