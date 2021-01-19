import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'app/services/toaster.service';
import { Location } from '@angular/common';
import { HireLawyerService } from 'app/services/hire-lawyer.service';
import { FileUploader } from 'ng2-file-upload';
import { CaseService } from 'app/services/case.service';
import { MatDialog } from '@angular/material/dialog';
import { InmateDefenderService } from 'app/services/inmate-defender.service';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-view-cases',
  templateUrl: './view-cases.component.html',
  styleUrls: ['./view-cases.component.css']
})
export class ViewCasesComponent implements OnInit {

  allCases = [];
  sharedCaseFiles: any;
  privateCaseFiles: any;
  fileId: number;
  fileType: string = 'private';

  public uploader1: FileUploader = new FileUploader({ url: URL });
  public hasAnotherDropZoneOver: boolean = false;
  defenderList: any;
  caseId: any;
  publicdefenderId: number;

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  
  constructor(private inmateService: InmateDefenderService, private activatedRoute: ActivatedRoute,
    private location: Location, private toasterService: ToasterService,private caseService: CaseService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.onGetCaseData();
    this.getAllDefender();
  }

  onOpenModal(templateRef, fileId) {
    this.fileId = fileId
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  closeModal() {
    this.dialog.closeAll();
  }

  getAllDefender(){
    this.inmateService.getPublicDefenders().subscribe((defenders:any)=>{
      this.defenderList = defenders.data.Organization.users
    })
  }


  onGetCaseData() {
    if (this.activatedRoute.snapshot.params['userId']) {
      this.inmateService.getCaseInmates(this.activatedRoute.snapshot.params['userId']).subscribe((res: any) => {
        if (res.data) {
          this.allCases = res.data;
        } else {
          this.toasterService.showErrorToater('No data found, invalid url detected.');
        }
      })
    } else {
      this.toasterService.showErrorToater('No data found, invalid url detected.');
    }
  }

  onSelectDefender(defenderId){
    this.publicdefenderId = parseInt(defenderId.value)
  }

  openModal(templateRef,caseId) {
    this.caseId = caseId
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
  }
  
  saveChanges(){
    let data = {
      "caseId":this.caseId,
      "publicdefenderId":this.publicdefenderId
    }
    this.inmateService.setPublicDefender(data).subscribe((user:any)=>{
      if(user.success){
        this.toasterService.showSuccessToater('Assignee added successfully')
        this.onGetCaseData();
        this.getAllDefender();
        this.dialog.closeAll();
      } else {
        this.toasterService.showWarningToater('Already assigned')
        this.dialog.closeAll();
      }
    })
  }

  onGoBack(){
    this.location.back();
  }

}
