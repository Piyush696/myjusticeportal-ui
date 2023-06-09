import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-lawyer-view-shared',
  templateUrl: './lawyer-view-shared.component.html',
  styleUrls: ['./lawyer-view-shared.component.css']
})
export class LawyerViewSharedComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() lawyerData: any;
  path='';
  hideButton: boolean;

  constructor(public dialog: MatDialog, private router: Router, private store: Store<any>) {  }

  ngOnChanges(): void {
      var x = document.getElementById('cust-img')
      if (this.lawyerData?.userAdditionalInfo?.header?.downloadLink) {
        x.style.background = 'url(' + this.lawyerData?.userAdditionalInfo?.header?.downloadLink + ')'
      } else {
        x.style.background = 'url(' + this.path + ')'
        x.style.backgroundColor = '#333442'
      }
  }

  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.store.select(s => s.userInfo).subscribe(x => {
      this.hideButton = x.roles[0].roleId == 3 || x.roles[0].roleId == 5;
    })
  }

  viewContact(userId) {
    this.router.navigateByUrl('mjp/user/contact/' + userId)
  }

  viewOrg(organizationId) {
    this.router.navigateByUrl('mjp/user/hire-lawyer/' + organizationId)
  }
}
