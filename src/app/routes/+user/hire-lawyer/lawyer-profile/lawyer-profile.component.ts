import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HireLawyerService } from 'app/services/hire-lawyer.service';

@Component({
  selector: 'app-lawyer-profile',
  templateUrl: './lawyer-profile.component.html',
  styleUrls: ['./lawyer-profile.component.css']
})
export class LawyerProfileComponent implements OnInit {
  userDetails:any
  practiseAreaList = [];
  constructor(private activatedRoute:ActivatedRoute,private hireLawyerService: HireLawyerService) { 
  }

  ngOnInit(): void {
    this.getLawyersInfo();
  }

  getLawyersInfo(){
    this.hireLawyerService.getLawyerProfileInfo(this.activatedRoute.snapshot.params['userId']).subscribe((user:any)=>{
      this.userDetails = user.data
        if(user.data.userAdditionalInfo && user.data.userAdditionalInfo.practiceAreas){
          this.practiseAreaList.push(user.data.userAdditionalInfo.practiceAreas.split(','))
        }
    })
  }

}
