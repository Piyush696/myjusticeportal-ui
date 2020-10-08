import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FacilityService } from 'app/services/registration/facility.service';

@Component({
  selector: 'app-select-facility',
  templateUrl: './select-facility.component.html',
  styleUrls: ['./select-facility.component.scss']
})

export class SelectFacilityComponent implements OnInit {
  facilityList: any;
  facility = [];
  @Input() currentState: any
  @Input() totalSteps: any;
  @Output() selectedFacilityEventEmitter = new EventEmitter();
  @Output() perviousClick = new EventEmitter();

  constructor(private facilityService: FacilityService) { }

  ngOnInit(): void {
    this.getAllFacility();
  }

  getAllFacility() {
    this.facilityService.getAllFacility().subscribe((facilities: any) => {
      this.facilityList = facilities.data.filter(facility => {
        return facility.Address.state == this.currentState
      })

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