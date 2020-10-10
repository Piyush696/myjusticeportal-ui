import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { LawyerService } from 'app/services/lawyer.service';
import { FacilityService } from 'app/services/facility.service';
import { HireLawyerService } from '../../../services/hire-lawyer.service';
import { ToasterService } from 'app/services/toaster.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

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
  displayedColumns: string[] = ["name", "facilities"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private hireLawyerService: HireLawyerService, private facilityService: FacilityService,
    private lawyerService: LawyerService, private toasterService: ToasterService, private store: Store<any>) { }

  ngOnInit(): void {
    this.store.select(s => s.userInfo).subscribe(x => {
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
  }

  getAllClients() {
    this.lawyerService.getClients().subscribe((clients: any) => {
      console.log(clients)
      this.clients = clients.data
      this.allClients = clients.data
      this.dataSource = new MatTableDataSource(clients.data);
      console.log(this.dataSource)
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
    console.log(facility)
    console.log(this.allClients)
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
    console.log(this.dataSource)
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