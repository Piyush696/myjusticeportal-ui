import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { HireLawyerService } from 'app/services/hire-lawyer.service';
import { SpecialtyService } from 'app/services/specialty.service';
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
  sponsorUserList: any;
  lawyerData: any;
  path = '';
  specialtyList: any;
  @ViewChild('modalopen') modalopen: ElementRef;

  constructor(private hireLawyerService: HireLawyerService, private caseService: CaseService, private router: Router, private specialtyService: SpecialtyService,
    private userAdditionalService: UserAdditionInfoService, private _statesService: StatesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.modalAcceptDetails();
    this.getSponsors();
    this.onGetLaywers();
    this.stateData();
    this.getAllSpecialty();
  }


  ngAfterViewInit(): void {
    //  this.modalopen.nativeElement.click();
  }

  modalAcceptDetails() {
    let metaKey = 'findlawyer_model'
    this.userAdditionalService.modalDetails(metaKey).subscribe((res: any) => {
      if (!res.data) {
        this.modalopen.nativeElement.click();
      }
    })
  }

  acceptDisclaimer() {
    let userMeta = { metaKey: 'findlawyer_model', metaValue: 'clicked' }
    this.userAdditionalService.caseCreateModal(userMeta).subscribe((res: any) => {
      this.modalAcceptDetails();
    })
  }

  getSponsors() {
    this.userAdditionalService.getSponsorUsers().subscribe((sponsorsUser: any) => {
      this.sponsorUserList = sponsorsUser.data
    })
  }

  getAllSpecialty() {
    this.specialtyService.getAllSpecialty().subscribe((res: any) => {
      this.specialtyList = res.data;
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
      this.organizationList = res.data.reduce((acc, element) => {
        if (!element.lawyerFacility[0].lawyer_facility.isSponsors == true) {
          return [...acc, element];
        }
        return [element, ...acc];
      }, []);
      this.filteredOrganizationList = this.organizationList
      this.specialityData = [...new Set(this.filteredOrganizationList.map(item => item.specialty))];
    })
  }

  openModal(templateRef, lawyerData) {
    this.lawyerData = lawyerData
    this.path = lawyerData?.userAdditionalInfo?.header?.downloadLink
    let dialogRef = this.dialog.open(templateRef, {
      width: '800px'
    });
    setTimeout(() => {
      var x = document.getElementById('cust-img')
      x.style.background = 'url(' + this.path + ')'
    }, 500);
  }

  viewUser(userId) {
    this.router.navigateByUrl('mjp/user/lawyer-profile/' + userId)
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
    this.currentSpeciality = value.value;
    this.organizationList = this.filteredOrganizationList.filter(org => {
      if (this.currentSpeciality && this.currentLocation) {
        return org?.userAdditionalInfo?.practiceAreas.includes(this.currentSpeciality) && (org?.Organization?.Address?.state == this.currentLocation)
      } else if (!this.currentSpeciality && !this.currentLocation) {
        return true;
      } else if (this.currentSpeciality && !this.currentLocation) {
        return org?.userAdditionalInfo?.practiceAreas.includes(this.currentSpeciality)
      } else if (!this.currentSpeciality && this.currentLocation) {
        return org?.Organization?.Address?.state == this.currentLocation;
      }
    })
  }

  onLocation(value) {
    this.currentLocation = value.value
    this.organizationList = this.filteredOrganizationList.filter(org => {
      if (this.currentSpeciality && this.currentLocation) {
        return org?.userAdditionalInfo?.practiceAreas.includes(this.currentSpeciality) && (org?.Organization?.Address?.state == this.currentLocation)
      } else if (!this.currentSpeciality && !this.currentLocation) {
        return true;
      } else if (this.currentSpeciality && !this.currentLocation) {
        return org?.userAdditionalInfo?.practiceAreas.includes(this.currentSpeciality)
      } else if (!this.currentSpeciality && this.currentLocation) {
        return org?.Organization?.Address?.state == this.currentLocation;
      }
    })
  }

  viewContact(userId) {
    this.router.navigateByUrl('mjp/user/contact/' + userId)
    this.dialog.closeAll();
  }

  viewOrg(organizationId) {
    this.router.navigateByUrl('mjp/user/hire-lawyer/' + organizationId)
    this.dialog.closeAll();
  }
}