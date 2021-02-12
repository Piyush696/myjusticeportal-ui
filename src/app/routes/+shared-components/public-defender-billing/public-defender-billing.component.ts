import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { FacilityService } from 'app/services/facility.service';
import { LawyerFacilityService } from 'app/services/lawyer-facility.service';
import { OrganisationService } from 'app/services/organisation.service';
import { ToasterService } from 'app/services/toaster.service';
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
  inviteMailForm: FormGroup;
  userData: any;
  orgCount:number = 0;
  selfCount:number = 0;
  displayedColumns: string[] = ["name", "userName", "roles", 'mobile', "createdAt", "action"];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  userList: any;
  
  constructor(private facilityService: FacilityService,private toasterService: ToasterService,private organisationService: OrganisationService, private store: Store<any>,   public dialog: MatDialog,private fb: FormBuilder, private userMetaService: UserMetaService,private lawyerFacilityService: LawyerFacilityService) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.createInviteMailFormControl();
    this.getUserDetailsStore();
    this.getAllUsers();
  }

  getUserDetailsStore(){
    this.store.select(s => s.userInfo).subscribe(x => {
      this.userData = x;
    });
  }

  getAllUsers() {
    this.orgCount = 0;
    this.selfCount = 0;
    this.totalPrice = 40;
    this.organisationService.getOrganisationUsers().subscribe((users: any) => {
      if (users.success) {
        users.data.users.map((user) => {
          if (user.isAdmin) {
            user.isAdmin = '(' + 'Admin' + ')'
            return user;
          } else {
            user.isAdmin = '';
          }
        })

         this.userList = users.data.users.map((item) => {

         if(!item.isAdmin && !item.isSelfPaid){
         this.orgCount = this.orgCount + 1;
         }if(!item.isAdmin && item.isSelfPaid){
          this.selfCount = this.selfCount +  1;
         }
          item['mobile'] = item.mobile
          item['name'] = item.firstName + " " + item.middleName + " " + item.lastName;
          item['name1'] = item.firstName + item.middleName + item.lastName;
          // item.roles1= item.roles[0].name +' '+item.isAdmin;
          if (item.isAdmin == '(Admin)') {
            item.roles1 = item.roles[0].name + ' ' + item.isAdmin;
            item.roles1 = item.roles1.trim();
          } else {
            item.roles1 = item.roles[0].name;
            item.roles1 = item.roles1.trim();
          }
          item.roles1 = item.roles1.trim();
          var date = item.createdAt;
          date = new Date(date).toDateString();
          var monthDay = date.substring(4, 10);
          var year = date.substring(10, 15);
          item['sent'] = monthDay + "," + year;
          return item;

        })
        this.totalPrice = ((this.orgCount * 40) + this.totalPrice)
        this.dataSource = new MatTableDataSource(users.data.users);
        if (this.dataSource) {
          this.dataSource.filterPredicate = (data: any, filter: string) => {
            const accumulator = (currentTerm, key) => {
              return this.nestedFilterCheck(currentTerm, data, key);
            };
            const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
            const transformedFilter = filter.trim().toLowerCase();
            return dataStr.indexOf(transformedFilter) !== -1;
          };
        }
        this.dataSource.sortingDataAccessor = (item: any, property) => {
          switch (property) {
            case 'name': if (item) return item.firstName + item.middleName + item.lastName;
            case 'roles': if (item) return item.roles[0].name;
            default: if (typeof (item[property]) == 'string') {
              return item[property].toLowerCase();
            } else {
              return item[property]
            }
          }
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {
        this.toasterService.showErrorToater(users.data)
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  validateEmail(control: AbstractControl) {
    const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,15})$/;
    if (control.value) {
      if (!control.value.match(pattern) && control.value !== '') {
        return { invalidEmail: true };
      }
    }
    return null;
  }


  openManageUsersModal(templateRef){
    let dialogRef = this.dialog.open(templateRef, {
      width: '900px',
    })
  }

  createInviteMailFormControl() {
    this.inviteMailForm = this.fb.group({
      userName: ['', [Validators.required, this.validateEmail.bind(this)]],
      isSelfPaid: ['', [Validators.required]]
    })
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

  onEmailInvite() {
    this.organisationService.inviteUserOrganisation(this.inviteMailForm.value).subscribe((res: any) => {
      if (res.success) {
        this.toasterService.showSuccessToater('Email Sent.');
        this.dialog.closeAll();
        this.getAllUsers();
      //  window.location.reload();
      }
      else {
        if (res.data == 'Email exist') {
          this.toasterService.showErrorToater('That email address is already in use. Please try a different email.');
        }
        else if (res.data == 'Something went wrong') {
          this.toasterService.showErrorToater('Something went wrong, please try again.');
        }
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
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

  closeModal(){
    this.dialog.closeAll();
  }

  
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

  openModal(templateRef) {
    this.inviteMailForm.reset();
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
    });
  }

  couponObj(value){
    if(value){
      if(value.name === "UNRECOGNIZED"){
        this.isDiscount = null;
      } else {
        this.isDiscount = value;
      }
    } else {
      this.isDiscount = value;
    }
   }
  

  startLoader(value) {
    this.spinner = value
  }

}
