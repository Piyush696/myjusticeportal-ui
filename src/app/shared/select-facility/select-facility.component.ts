import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FacilityService } from 'app/services/facility.service';

@Component({
  selector: 'app-select-facility',
  templateUrl: './select-facility.component.html',
  styleUrls: ['./select-facility.component.css']
})
export class SelectFacilityComponent implements OnInit {
  facilityList: any;
  facility = [];
  @Output() selectedFacilityEventEmitter = new EventEmitter();

  constructor(private facilityService: FacilityService) { }

  ngOnInit(): void {
    this.getAllFacility();
  }

  getAllFacility() {
    this.facilityService.getFacilities().subscribe((facilities: any) => {
      console.log(facilities)
      this.facilityList = facilities.data
    })
  }

  onNativeChange(event, facilityId) {
    console.log(event, facilityId)
    if (event) {
      this.facility.push(facilityId)
    }
    else {
      this.facility.forEach((x, i, a) => {
        if (x == facilityId) {
          this.facility.splice(i, 1)
        }
      })
    }
    console.log(this.facility)
  }

  submit() {
    this.selectedFacilityEventEmitter.emit(this.facility)
  }

}
