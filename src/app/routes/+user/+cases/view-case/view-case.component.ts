import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { ToasterService } from 'app/services/toaster.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-case',
  templateUrl: './view-case.component.html',
  styleUrls: ['./view-case.component.scss']
})

export class ViewCaseComponent implements OnInit {
  caseDetails: any;
  caseNoteForm: FormGroup;
  assignedLawyer: any;
  // enableEditBtn: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private caseService: CaseService,
    private toasterService: ToasterService, private location: Location,
    public dialog: MatDialog, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.assignedLawyer = ''
    this.caseNoteForm = this.fb.group({
      notes: ['', [Validators.required]]
    })
    this.getCase();
    this.getAssignedLawyer();
  }

  getAssignedLawyer() {
    this.caseService.getAssignedLawyer(this.route.snapshot.params['caseId']).subscribe((lawyer: any) => {
      console.log(lawyer.data)
      if (lawyer.data != 'No lawyer assigned to this case.') {
        this.assignedLawyer = lawyer.data
      } else {
        this.assignedLawyer = '';
      }
    })
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

  backToCases() {
    this.location.back();
  }

  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '836px',
    });
    this.caseNoteForm.get('notes').setValue(this.caseDetails.notes);
    // this.caseNoteForm.get('notes').disable();
    dialogRef.afterClosed().subscribe(result => {
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