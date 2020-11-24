import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { HireLawyerService } from 'app/services/hire-lawyer.service';
import { StatesService } from 'app/services/states.service';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';

@Component({
  selector: 'app-hire-lawyer',
  templateUrl: './hire-lawyer.component.html',
  styleUrls: ['./hire-lawyer.component.scss']
})

export class HireLawyerComponent implements OnInit, AfterViewInit {
  organizationList: any;
  states: any[];
  specialityData: any;
  currentSpeciality: any;
  currentLocation: any;
  filteredOrganizationList: any;
  @ViewChild('modalopen') modalopen: ElementRef
  sponsorUserList: any;
  lawyerData: any;
  path = 'assets/img/75a4c2d1dc2dbce3342109e8270ff4f3.jpg';

  constructor(private hireLawyerService: HireLawyerService, private caseService: CaseService, private router: Router,
    private userAdditionalService: UserAdditionInfoService, private _statesService: StatesService, public dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.modalopen.nativeElement.click();
  }


  ngOnInit(): void {
    this.getSponsors();
    this.onGetLaywers();
    this.stateData();
    this.modalopen.nativeElement.click();
  }

  getSponsors() {
    this.userAdditionalService.getSponsorUsers().subscribe((sponsorsUser: any) => {
      this.sponsorUserList = sponsorsUser.data
    })
  }

  onContactLawyer(userId) {
    this.router.navigateByUrl('/mjp/user/contact/' + userId)
  }

  onViewLawyer(userId) {
    this.router.navigateByUrl('/mjp/user/lawyer-profile/' + userId)
  }

  onGetLaywers() {
    this.hireLawyerService.getOrganization().subscribe((res: any) => {
      this.organizationList = res.data;
      this.filteredOrganizationList = this.organizationList
      this.specialityData = [...new Set(this.filteredOrganizationList.map(item => item.specialty))];
    })
  }

  openModal(templateRef, lawyerData) {
    this.lawyerData = lawyerData
    // this.path = lawyerData?.userAdditionalInfo?.profile?.downloadLink
    let dialogRef = this.dialog.open(templateRef, {
      width: '45%',
      position: {
        top: '80px',
      },
    });
    setTimeout(() => {
      var x = document.getElementById('cust-img')
      x.style.background = 'url(' + this.path + ')'
    }, 500);
  }

  onCloseModal() {
    this.dialog.closeAll();
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

  viewContact(userId){
    this.router.navigateByUrl('mjp/user/contact/'+userId)
    this.dialog.closeAll();
  }

  viewOrg(organizationId){
    this.router.navigateByUrl('mjp/user/hire-lawyer/'+organizationId)
    this.dialog.closeAll();
  }
}