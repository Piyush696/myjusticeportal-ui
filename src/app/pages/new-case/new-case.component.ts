import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-case',
  templateUrl: './new-case.component.html',
  styleUrls: ['./new-case.component.css']
})
export class NewCaseComponent implements OnInit {
  addCaseForm: FormGroup;

  constructor(private route: Router, private toastr: ToastrService, private fb: FormBuilder, private caseService: CaseService) { }

  ngOnInit(): void {
    this.addCaseForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      countyOfArrest: ['', [Validators.required]],
      dateOfArrest: ['', [Validators.required]],
      caseRelatedTo: ['', [Validators.required]],
      caseJurisdiction: ['', [Validators.required]],
      nextCourtDate: ['', [Validators.required]],
      legalRepresentation: ['', [Validators.required]],
    });
  }

  backToCase() {
    let url = '/cases';
    this.route.navigateByUrl(url)
  }

  createCase() {
    this.caseService.postCase(this.addCaseForm.value).subscribe((res: any) => {
      if (res.success) {
        this.showNotification('top', 'right', 'success');
      }
    })
  }

  showNotification(from, align, value) {
    if (value === 'success') {
      this.toastr.success(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Cases sussessfully Submitted</b></span>',
        "",
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-info alert-with-icon",
          positionClass: "toast-" + from + "-" + align
        }
      );
    }
    else {
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Error</b></span>',
        "",
        {
          timeOut: 4000,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: "toast-" + from + "-" + align
        }
      );
    }
  }
}
