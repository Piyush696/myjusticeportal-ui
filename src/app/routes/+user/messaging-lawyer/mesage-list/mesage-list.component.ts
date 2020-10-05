import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mesage-list',
  templateUrl: './mesage-list.component.html',
  styleUrls: ['./mesage-list.component.css']
})
export class MesageListComponent implements OnInit {
  @Input() userMessageList: any
  @Output() messageEvent = new EventEmitter()
  selectedUser: any;

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }


  onClicklawyer(lawyerId) {
    this.selectedUser = lawyerId;
    let data = {
      isMessage: true,
      lawyerId: lawyerId
    }
    this.messageEvent.emit(data)
  }

  onOpenModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
    });
  }
}