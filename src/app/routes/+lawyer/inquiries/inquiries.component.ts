import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from 'app/services/toaster.service';
import { HireLawyerService } from 'app/services/hire-lawyer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit {
  pendingCasesList: any;
  displayedColumns: string[] = ["name", "briefDescriptionOfChargeOrLegalMatter", "sentAt", "status", "action"];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  userId: any;

  constructor(private userAdditionInfoService: UserAdditionInfoService, public dialog: MatDialog,
    private toasterService: ToasterService, private router: Router) { }

  ngOnInit(): void {
    this.getPendingCaseDetails();
  }

  search(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
        this.dataSource.filterPredicate = (searchValue: any, filter) => {
      const dataStr =JSON.stringify(searchValue).toLowerCase();
      return dataStr.indexOf(filter) != -1; 
    }
  }

  getPendingCaseDetails() {
    this.userAdditionInfoService.getLawyerCases().subscribe((pendingCase: any) => {
      this.pendingCasesList = pendingCase.data
      this.pendingCasesList = this.pendingCasesList.map((item)=>{
        item['name']=item.inmate.firstName+" "+item.inmate.lastName;
        item['name1']=item.inmate.firstName+item.inmate.lastName;
        var year=item.sentAt.substring(0, 4);
        var month=item.sentAt.substring(5, 7);
        var day=item.sentAt.substring(8, 10);
        if(month == "01"){
          var newMonth="January"
        }else if(month == "02" ){
          var newMonth="february"
        }else if(month == "03" ){
          var newMonth="March"
        }else if(month == "04" ){
          var newMonth="April"
        }else if(month == "05" ){
          var newMonth="May"
        }else if(month == "06" ){
          var newMonth="Jun"
        }else if(month == "07" ){
          var newMonth="July"
        }else if(month == "08" ){
          var newMonth="August"
        }else if(month == "09" ){
          var newMonth="September"
        }else if(month == "10" ){
          var newMonth="October"
        }else if(month == "11" ){
          var newMonth="November"
        }else if(month == "12" ){
          var newMonth="December"
        }
        var date=newMonth+" "+day+", "+year;
        item['sent']=date;
        return item;
      })
      this.dataSource = new MatTableDataSource(this.pendingCasesList);
      this.dataSource.sortingDataAccessor = (item: any, property) => {
        switch (property) {
          case 'name': if (item) return item.inmate.firstName + item.inmate.lastName;
          default: return item[property];
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  onOpenModal(templateRef, userId) {
    this.userId = userId
    let dialogRef = this.dialog.open(templateRef, {
      width: '300px',
    });
  }
  
  closeModal() {
    this.dialog.closeAll()
  }

  onStatusUpdate(caseId, status) {
    const data = {
      'caseId': caseId,
      'status': status
    }
    this.userAdditionInfoService.updateLawywrStatus(data).subscribe((res: any) => {
      if (res.success) {
        this.getPendingCaseDetails();
        this.toasterService.showSuccessToater('Status update successfully.');
      } else {
        this.toasterService.showErrorToater('Something went wrong, please try again.');
      }
    });
  }

  onChatEnable() {
    this.dialog.closeAll();
    this.router.navigateByUrl('/mjp/lawyer/lawyer-chat/' + this.userId);
  }

  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length > 500)
      return [10, 50, 100, 500, this.dataSource.paginator?.length];
    else if (this.dataSource.data.length > 100) {
      return [10, 50, 100, this.dataSource.paginator?.length];
    }
    else if (this.dataSource.data.length > 50) {
      return [10, 50, this.dataSource.paginator?.length];
    }
    else if (this.dataSource.data.length > 10) {
      return [10, this.dataSource.paginator?.length];
    }
    else {
      return [10];
    }
  }
}
