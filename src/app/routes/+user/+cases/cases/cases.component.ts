import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CaseService } from 'app/services/case.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})

export class CasesComponent implements OnInit {
  caseList: any;
  caseNoteForm: FormGroup;
  enableEditBtn: boolean = true;
  currentCaseId: any;

  constructor(private toasterService: ToasterService, public dialog: MatDialog,
    private caseService: CaseService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getCases();
    this.createCaseNotesForm();
  }

  createCaseNotesForm() {
    this.caseNoteForm = this.fb.group({
      notes: ['', [Validators.required]]
    })
  }

  getCases() {
    this.caseService.getCases().subscribe((cases: any) => {
      if (cases.success) {
        this.caseList = cases.data;
      }
      else {
        this.toasterService.showErrorToater(cases.data)
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }

  openModal(templateRef, value) {
    this.currentCaseId = value.caseId
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
    });
    this.caseNoteForm.get('notes').setValue(value.notes)
    this.caseNoteForm.get('notes').disable();
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onSaveChanges() {
    this.caseService.updateCase(this.caseNoteForm.value, this.currentCaseId).subscribe((res: any) => {
      if (res.success) {
        this.caseNoteForm.disable();
        this.dialog.closeAll();
        this.getCases();
        this.enableEditBtn = true;
        this.toasterService.showSuccessToater('Notes Updated Successfully.');
      } else {
        this.toasterService.showErrorToater(res.data);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }
}