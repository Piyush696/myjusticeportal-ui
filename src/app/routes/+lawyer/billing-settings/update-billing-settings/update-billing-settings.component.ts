import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-billing-settings',
  templateUrl: './update-billing-settings.component.html',
  styleUrls: ['./update-billing-settings.component.css']
})
export class UpdateBillingSettingsComponent implements OnInit {
  update:boolean = true;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  onPayEvent(value){
    this.router.navigateByUrl('/mjp/lawyer/billing-setting')
  }
}
