import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { ToasterService } from 'app/services/toaster.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LawyerService } from 'app/services/lawyer.service';
import { UserService } from 'app/services/registration/user.service';


@Component({
  selector: 'app-view-case',
  templateUrl: './view-case.component.html',
  styleUrls: ['./view-case.component.scss']
})

export class ViewCaseComponent implements OnInit {
  caseDetails: any;
  caseNoteForm: FormGroup;
  assignedLawyer: any;
  isFacility: boolean;
  practicearea: any;
  practiceAreaList = [];

  constructor(private router: Router, private route: ActivatedRoute, private caseService: CaseService,
    private toasterService: ToasterService, private location: Location,
    public dialog: MatDialog, private fb: FormBuilder, private lawyerService: LawyerService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.assignedLawyer = ''
    this.caseNoteForm = this.fb.group({
      notes: ['', [Validators.required]]
    })
    this.getCase();
    this.getAssignedLawyer();

    this.userService.userFacility().subscribe((res: any) => {
      this.isFacility = res.data ? true : false
    })
  }

  
  onViewLawyer(userId) {
    this.router.navigateByUrl('mjp/user/lawyer-profile/'+userId)
  }
  
  getAssignedLawyer() {
    this.caseService.getAssignedLawyer(this.route.snapshot.params['caseId']).subscribe((lawyer: any) => {
      if (lawyer.data != 'No lawyer assigned to this case.') {
        this.assignedLawyer = lawyer.data
        if(this.assignedLawyer?.userAdditionalInfo?.practiceAreas){ 
          this.practiceAreaList =  lawyer?.data?.userAdditionalInfo?.practiceAreas.split(",")
          this.practicearea = this.assignedLawyer?.userAdditionalInfo?.practiceAreas.split(",").slice(0, 3)
          console.log(this.practiceAreaList)
        }
      } else {
        this.assignedLawyer = '';
      }
    })
  }

  openPAModal(templateRef){
    this.dialog.open(templateRef, {
      width: '500px'
    });
  }

  getCase() {
    this.caseService.getCase(this.route.snapshot.params['caseId']).subscribe((result: any) => {
      if (result.success) {
        this.caseDetails = result.data;
      }
      else {
        this.toasterService.showErrorToater(result.data);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

  removeLawyer(userId) {
    this.lawyerService.deleteLawyerCase(userId, this.route.snapshot.params['caseId']).subscribe((deletedLawyer: any) => {
      if (deletedLawyer.data == 1) {
        this.assignedLawyer = ''
        this.toasterService.showSuccessToater('Lawyer Removed from case.')
        this.getAssignedLawyer();
        this.dialog.closeAll();
      } else {
        this.toasterService.showErrorToater('Something went wrong.')
      }
    })
  }

  backToCases() {
    this.location.back();
  }

  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '800px'
    });
    this.caseNoteForm.get('notes').setValue(this.caseDetails.notes);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  removeAlert(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '23%',
    });
  }

  onSaveChanges() {
    this.caseService.updateCase(this.caseNoteForm.value, this.caseDetails.caseId).subscribe((res: any) => {
      if (res.success) {
        // this.caseNoteForm.disable();
        this.dialog.closeAll();
        this.getCase();
        // this.enableEditBtn = true;
        this.toasterService.showSuccessToater('Note Updated Successfully.');
      } else {
        this.toasterService.showErrorToater(res.data);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }
  bailbondsNavigate() {
    this.router.navigateByUrl('/mjp/user/find-bondsman')
  }
  hireLayer() {
    this.router.navigateByUrl('/mjp/user/hire-lawyer')
  }

  onCancelNotesModal() {
    this.dialog.closeAll();
  }
}