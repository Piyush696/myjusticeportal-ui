import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from '../../../services/message.service';

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
  lastChat: any;

  constructor(public dialog: MatDialog, private messageService: MessageService) { }
  ngOnChanges(): void {
    if (this.userList) {
      this.oldUserList = this.userList
      this.show = false
    } else if (this.userMessageList) {
      this.show = true
    }
  }

  ngOnInit(): void {
    this.previouslyTextedUser()
  }

  onNativeChange(user) {
    console.log(user)
    this.selectedLawyer = user
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
    this.oldUserList.push(this.selectedLawyer);
    let lawyerArray = []
    lawyerArray.push(this.selectedLawyer)
    this.userMessageList = this.userMessageList.filter(item1 =>
      !lawyerArray.some(item2 => (item2.userId === item1.userId)))
    this.dialog.closeAll()
  }

  closeModal() {
    let dialogRef = this.dialog.closeAll()
  }

  previouslyTextedUser() {
    this.messageService.getLastTextedUser().subscribe((res: any) => {
      console.log(res)

      this.lastChat = res.data[0]
      console.log(this.lastChat)

      this.selectedUser = this.lastChat.receiverId;
      let data = {
        isMessage: true,
        lawyerId: this.lastChat.receiverId
      }
      this.messageEvent.emit(data)
    })

  }

  ngOnDestroy(): void {
    this.dialog.closeAll()

  }
}