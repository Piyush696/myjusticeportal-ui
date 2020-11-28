import { Component, OnInit } from '@angular/core';
import { LawyerService } from 'app/services/lawyer.service';


@Component({
  selector: 'app-billing-settings',
  templateUrl: './billing-settings.component.html',
  styleUrls: ['./billing-settings.component.css']
})
export class BillingSettingsComponent implements OnInit {

  constructor(private lawyerService: LawyerService) { }

  ngOnInit(): void {
     this.getBillingData();
  }

  getBillingData(){
    this.lawyerService.getBillingDetails().subscribe((bill:any)=>{
      console.log(bill)
    })
  }

}
