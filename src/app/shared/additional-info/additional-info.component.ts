import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserMetaService } from 'app/services/user-meta.service';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css']
})
export class AdditionalInfoComponent implements OnInit {

  additionalInfo: FormGroup;

  @Output() userMetaEventEmitter = new EventEmitter();
  @Input('email') email: string;

  constructor(private fb: FormBuilder, private userMetaService: UserMetaService) { }

  ngOnInit(): void {
    this.additionalInfo = this.fb.group({
      housing_unit: ['', [Validators.required]],
      facility: ['', [Validators.required]],
    })
  }

  submit() {

    var userMetaList = [{ metaKey: 'housing_unit', metaValue: this.additionalInfo.get('housing_unit').value },
    { metaKey: 'facility', metaValue: this.additionalInfo.get('facility').value }]
    this.userMetaService.createUserMeta({ metaList: userMetaList, email: this.email }).subscribe(
      (res: any) => {
        this.userMetaEventEmitter.emit(true);
      })
  }

}
