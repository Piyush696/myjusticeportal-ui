import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mesage-list',
  templateUrl: './mesage-list.component.html',
  styleUrls: ['./mesage-list.component.css']
})
export class MesageListComponent implements OnInit {
  @Input() userMessageList: any
  @Output() messageEvent = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  onClicklawyer(lawyerId) {
    let data = {
      isMessage: true,
      lawyerId: lawyerId
    }
    this.messageEvent.emit(data)

  }
}
