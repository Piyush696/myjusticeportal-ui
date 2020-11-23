import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LegalResearchService } from 'app/services/legal-research.service';
import { ToasterService } from 'app/services/toaster.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-legal-research-form',
  templateUrl: './view-legal-research-form.component.html',
  styleUrls: ['./view-legal-research-form.component.css']
})
export class ViewLegalResearchFormComponent implements OnInit {
  
  reSearchDetails: any;
  legalFormNoteForm: FormGroup;
  legalResearchId: any;

  constructor(private legalResearchService: LegalResearchService, private router: Router, private route: ActivatedRoute,
    private toasterService: ToasterService, private location: Location, public dialog: MatDialog,private fb: FormBuilder) { }


  ngOnInit(): void {
    this.legalFormNoteForm = this.fb.group({
      notes: ['', [Validators.required]]
    })
    this.getSingleFormData()
  }

  
  getSingleFormData() {
    this.legalResearchService.ongetSingleLegalForms(this.route.snapshot.params['legalResearchId']).subscribe((result: any) => {
      if (result.success) {
        this.reSearchDetails = result.data;
      }
      else {
        this.toasterService.showErrorToater(result.data);
      }
      (error: any) => {
        this.toasterService.showErrorToater(error.statusText);
      }
    })
  }
  
  backToCases() {
    this.location.back();
  }

  openModal(templateRef,legalResearchId) {
    this.legalResearchId = legalResearchId
    let dialogRef = this.dialog.open(templateRef, {
      width: '836px',
    });
    this.legalFormNoteForm.get('notes').setValue(this.reSearchDetails.notes);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  
  onSaveChanges() {
    this.legalResearchService.updateForm(this.legalFormNoteForm.value, this.legalResearchId).subscribe((res: any) => {
      if (res.success) {
        this.dialog.closeAll();
        this.getSingleFormData();
        this.toasterService.showSuccessToater('Notes Updated Successfully.');
      } else {
        this.toasterService.showErrorToater(res.data);
      }
    }, (error: any) => {
      this.toasterService.showErrorToater(error.statusText);
    })
  }
  
  onCancelNotesModal() {
    this.dialog.closeAll();
  }

}
