import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { HireLawyerService } from 'app/services/hire-lawyer.service';
import { StatesService } from 'app/services/states.service';

@Component({
  selector: 'app-hire-lawyer',
  templateUrl: './hire-lawyer.component.html',
  styleUrls: ['./hire-lawyer.component.scss']
})

export class HireLawyerComponent implements OnInit {
  organizationList: any;
  states: any[];
  specialityData: any;
  currentSpeciality: any;
  currentLocation: any;
  filteredOrganizationList: any;

  constructor(private hireLawyerService: HireLawyerService, private caseService: CaseService,
    private _statesService: StatesService) { }

  ngOnInit(): void {
    this.onGetLaywers();
    this.stateData()
  }

  onGetLaywers() {
    this.hireLawyerService.getOrganization().subscribe((res: any) => {
      this.organizationList = res.data;
      this.filteredOrganizationList = this.organizationList
      this.specialityData = [...new Set(this.filteredOrganizationList.map(item => item.specialty))];
    })
  }
  stateData() {
    this._statesService.getStates()
      .subscribe(data => {
        this.states = data
      });
  }

  onSpeciality(value) {
    this.currentSpeciality = value.value
    if (this.currentSpeciality && this.currentLocation) {
      this.organizationList = this.filteredOrganizationList.filter((org) => {
        return org.Address.state == this.currentLocation && org.specialty == this.currentSpeciality
      })
    }

    else if (value.value !== undefined) {
      this.organizationList = this.filteredOrganizationList.filter((org) => {
        return org.specialty == this.currentSpeciality
      })
    }

    else if ((this.currentSpeciality == undefined) && this.currentLocation) {
      this.organizationList = this.filteredOrganizationList.filter((org) => {
        return org.Address.state == this.currentLocation
      })
    }

    else if ((this.currentLocation == undefined) && this.currentSpeciality) {
      this.organizationList = this.filteredOrganizationList.filter((org) => {
        return org.specialty == this.currentSpeciality
      })
    }

    else if (this.currentSpeciality == undefined) {
      return this.organizationList = this.filteredOrganizationList
    }

  }

  onLocation(value) {
    this.currentLocation = value.value

    if (this.currentLocation && this.currentSpeciality) {
      this.organizationList = this.filteredOrganizationList.filter((org) => {
        return org.Address.state == this.currentLocation && org.specialty == this.currentSpeciality
      })
    }

    else if (value.value !== undefined) {
      this.organizationList = this.filteredOrganizationList.filter((org) => {
        return org.Address.state === this.currentLocation
      })
    }

    else if ((this.currentLocation == undefined) && this.currentSpeciality) {
      this.organizationList = this.filteredOrganizationList.filter((org) => {
        return org.specialty == this.currentSpeciality
      })
    }

    else if (this.currentLocation && (this.currentSpeciality == undefined)) {
      this.organizationList = this.filteredOrganizationList.filter((org) => {
        return org.Address.state === this.currentLocation
      })
    }

    else if (this.currentLocation == undefined) {
      this.organizationList = this.filteredOrganizationList
    }
  }
}