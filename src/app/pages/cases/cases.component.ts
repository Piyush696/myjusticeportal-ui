import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})

export class CasesComponent implements OnInit {
  caseList: any;
  caseNoteForm: FormGroup;
  buttonText: string = 'Edit';
  currentCaseId: any;

  constructor(private toasterService: ToasterService, public dialog: MatDialog,
    private caseService: CaseService, private route: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCases();
    this.createCaseNotesForm()
  }

  createCaseNotesForm() {
    this.caseNoteForm = this.fb.group({
      notes: ['', [Validators.required]]
    })
  }

  getCases() {
    this.caseService.getCases().subscribe((cases: any) => {
      this.caseList = cases.data;
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

  onViewCase(caseId) {
    this.route.navigateByUrl('/case/' + caseId);
  }

  onSaveChanges() {
    this.caseService.updateCase(this.caseNoteForm.value, this.currentCaseId).subscribe((res: any) => {
      this.caseNoteForm.disable();
      this.dialog.closeAll();
      this.getCases();
      this.buttonText = 'Edit';
      this.toasterService.showSuccessToater('Notes Updated Successfully.')
    })
  }
}