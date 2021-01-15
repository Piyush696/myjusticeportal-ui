import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DefenderService } from 'app/services/defender.service';
import { FacilityService } from 'app/services/facility.service';
import { UserMetaService } from 'app/services/user-meta.service';

@Component({
  selector: 'app-manage-billing-settings',
  templateUrl: './manage-billing-settings.component.html',
  styleUrls: ['./manage-billing-settings.component.css']
})
export class ManageBillingSettingsComponent implements OnInit {
  facilities = [];
  planPrice: number = 0;
  currentPlanPrice: number = 40;
  totalBillingPrice: number = 40;

  constructor(private defenderService: DefenderService) { }

  ngOnInit(): void {
    this.getBillableFacility();
  }


  getBillableFacility() {
    this.defenderService.getBilliableFacilityDetails().subscribe((data: any) => {
      this.facilities = data.facilities
    })
  }

}
