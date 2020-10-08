import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LawyerService } from 'app/services/lawyer.service';
import { FacilityService } from 'app/services/facility.service';
import { HireLawyerService } from '../../../services/hire-lawyer.service';
import { ToasterService } from 'app/services/toaster.service';


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
    console.log(facility.value)
    this.clients = this.allClients.filter((client) => {
      console.log(client)
      console.log(client.inmate.facilities[0].facilityId == facility.value)
      console.log(client.inmate.facilities.facilityId)
      console.log(facility.value)
      return client.inmate.facilities[0].facilityId == facility.value
    })
  }


  getALLFacilities() {
    this.facilityService.getFacilities().subscribe((facilities: any) => {
      console.log(facilities)
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
}