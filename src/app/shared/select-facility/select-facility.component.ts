import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FacilityService } from 'app/services/facility.service';

@Component({
  selector: 'app-select-facility',
  templateUrl: './select-facility.component.html',
  styleUrls: ['./select-facility.component.scss']
})

export class SelectFacilityComponent implements OnInit {
  facilityList: any;
  facility = [];

  @Input() totalSteps: any;
  @Output() selectedFacilityEventEmitter = new EventEmitter();
  @Output() perviousClick = new EventEmitter();

  constructor(private facilityService: FacilityService) { }

  ngOnInit(): void {
    this.getAllFacility();
  }

  getAllFacility() {
    this.facilityService.getFacilities().subscribe((facilities: any) => {
      this.facilityList = facilities.data;
    });
  }

  onNativeChange(event, facilityId) {
    if (event) {
      this.facility.push(facilityId);
    } else {
      this.facility.forEach((x, i, a) => {
        if (x == facilityId) {
          this.facility.splice(i, 1);
        }
      })
    }
  }

  onPeviousClick() {
    this.perviousClick.emit(true)
  }

  submit() {
    this.selectedFacilityEventEmitter.emit(this.facility);
  }
}