import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mesage-list',
  templateUrl: './mesage-list.component.html',
  styleUrls: ['./mesage-list.component.css']
})
export class MesageListComponent implements OnInit, OnChanges {
  @Input() userMessageList: any
  @Input() headerText: string;
  @Input() oldUserList: any
  @Input() userList: any;
  @Output() messageEvent = new EventEmitter()
  @Output() SubmitEvent = new EventEmitter()
  selectedUser: any;
  selectedLawyer: any;
  show: any;

  constructor(public dialog: MatDialog,) { }
  ngOnChanges(): void {
    if (this.userList) {
      this.oldUserList = this.userList
      this.show = false
    } else if (this.userMessageList) {
      this.show = true
    }
  }

  ngOnInit(): void {
  }

  onNativeChange(event, user) {
    this.selectedLawyer = user
    if (event) {
      this.oldUserList.push(user);
    } else {
      this.oldUserList.forEach((x, i, a) => {
        if (x.userId == user.userId) {
          this.oldUserList.splice(i, 1)
        }

      })
    }
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

  onEmailInvite() {
    let lawyerArray = [this.selectedLawyer]
    let dialogRef = this.dialog.closeAll()
    this.userMessageList = this.userMessageList.filter(item1 =>
      !lawyerArray.some(item2 => (item2.userId === item1.userId)))

  }

  closeModal() {
    let dialogRef = this.dialog.closeAll()

  }
}