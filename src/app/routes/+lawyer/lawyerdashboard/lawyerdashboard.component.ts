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

@Component({
  selector: 'app-lawyerdashboard',
  templateUrl: './lawyerdashboard.component.html',
  styleUrls: ['./lawyerdashboard.component.scss']
})

export class LawyerdashboardComponent implements OnInit {
  requestedCases: any;
  isAuthorized: boolean;
  clients: any;
  facilities: any;
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

  constructor(private hireLawyerService: HireLawyerService, private facilityService: FacilityService, public dialog: MatDialog,
    private lawyerService: LawyerService, private toasterService: ToasterService, private store: Store<any>, private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.store.select(s => s.userInfo).subscribe(x => {
      console.log(x)
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
    this.createPlanControl();
  }

  createCardControl() {
    this.cardForm = this.fb.group({
      name: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      valid: ['', [Validators.required]],
      card: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), this.cardPatternValidation.bind(this)], this.cardValidation.bind(this)],
    })
  }

  createPlanControl() {
    this.selectPlanForm = this.fb.group({
      plan: ['', [Validators.required]],
    })
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

  backFacilitys() {
    this.count = 1;
    this.step = 0;
  }
  yourFacilitys() {
    this.step = 1;
    this.count = 0;
  }
  backEstimatadBill() {
    this.step = 1;
    this.count = 0;
  }
  estimatadBill() {
    this.step = 2;
    this.count = 0;
  }
  cardPayment() {
    this.step = 3;
    this.count = 0;
  }

  // openestimatadBillModal(templateRef) {
  //   let dialogRef = this.dialog.open(templateRef, {
  //     width: '500px',
  //   });
  // }

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
    this.facilityService.getFacilities().subscribe((facilities: any) => {
      this.facilities = facilities.data;
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