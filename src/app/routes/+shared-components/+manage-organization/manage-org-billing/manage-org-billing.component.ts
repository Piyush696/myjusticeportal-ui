import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'app/services/toaster.service';
import { Location } from '@angular/common';
import { LawyerService } from 'app/services/lawyer.service';
import { MatDialog } from '@angular/material/dialog';
import { OrganisationService } from 'app/services/organisation.service';

@Component({
  selector: 'app-manage-org-billing',
  templateUrl: './manage-org-billing.component.html',
  styleUrls: ['./manage-org-billing.component.css']
})
export class ManageOrgBillingComponent implements OnInit {

  cardDetails: any;
  userList: any;
  orgCount:number = 0;
  headerText: boolean = false;
  constructor(private location: Location,private toasterService: ToasterService,private lawyerService: LawyerService,public dialog: MatDialog, private organisationService: OrganisationService) { }

  ngOnInit(): void {
    this.getUserCardDetails();
    this.getAllUsers();
  }

  getAllUsers() {
    this.organisationService.getOrganisationUsers().subscribe((users: any) => {
        this.userList = users.data.users.map((item) => {

          if(!item.isAdmin && !item.isSelfPaid){
          this.orgCount = this.orgCount + 1;
          }
        })
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

  getUserCardDetails() {
    this.lawyerService.getCardDetails().subscribe((res: any) => {
      this.cardDetails = res.data
    })
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
  
  backToMO() {
    this.location.back();
  }
}
