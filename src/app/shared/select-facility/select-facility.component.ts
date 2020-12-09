import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FacilityService } from 'app/services/registration/facility.service';

@Component({
  selector: 'app-select-facility',
  templateUrl: './select-facility.component.html',
  styleUrls: ['./select-facility.component.scss']
})

export class SelectFacilityComponent implements OnInit {
  facilityList = [];
  facility = [];
  @Input() currentState: any
  @Input() totalSteps: any;
  @Output() selectedFacilityEventEmitter = new EventEmitter();
  @Output() perviousClick = new EventEmitter();
  @Input() roleId;
  
  constructor(private facilityService: FacilityService) { }

  ngOnInit(): void {
    this.getAllFacility();
  }

  getAllFacility() {
    this.facilityService.getAllFacility().subscribe((facilities: any) => {
      if (this.currentState) {
        for (let i = 0; i <= this.currentState.length - 1; i++) {
          for (let j = i; j <= facilities.data.length - 1; j++) {
            if (this.currentState[i] === facilities.data[j].Address.state) {
              this.facilityList.push(facilities.data[j])
            }
          }
        }
      }
      else {
        this.facilityList = facilities.data
      }
    })
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