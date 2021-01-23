import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-mesage-list',
  templateUrl: './mesage-list.component.html',
  styleUrls: ['./mesage-list.component.css']
})
export class MesageListComponent implements OnInit, OnChanges {

  @Input() userMessageList: any
  @Input() headerText: string;
  @Input() oldUserList: any[]
  @Input() userList: any;
  @Output() messageEvent = new EventEmitter()
  @Output() SubmitEvent = new EventEmitter()
  @Output() userEvent = new EventEmitter()
  selectedUser: any;
  selectedLawyer: any;
  show: any;
  lastChat: any;

  constructor(public dialog: MatDialog, private router: ActivatedRoute, private userService: UserService, private messageService: MessageService) { }
  ngOnChanges(): void {
    if (this.userMessageList) {
      this.userMessageList.forEach((x) => {
        this.oldUserList.push(x)
      })
    }
    if (this.userList) {
      this.oldUserList = this.userList
      this.show = false
    } else if (this.userMessageList) {
      this.show = true
    }

    if (this.router.snapshot.params['userId']) {
      this.getUserDetails(this.router.snapshot.params['userId'])
      this.selectedUser = this.router.snapshot.params['userId']
      let data = {
        isMessage: true,
        receiverId: this.selectedUser
      }
      this.messageEvent.emit(data)
    }
  }

  ngOnInit(): void {
    if (this.userList || this.userMessageList) {
      this.previouslyTextedUser()
    }
  }

  onNativeChange(user) {
    this.selectedLawyer = user
  }

  onClicklawyer(receiverId) {
    this.selectedUser = receiverId;
    let data = {
      isMessage: true,
      receiverId: receiverId
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
      this.lastChat = res.data[0]
      if (this.lastChat) {
        this.selectedUser = this.lastChat.receiverId;
        let data = {
          isMessage: true,
          receiverId: this.lastChat.receiverId
        }
        //this.messageEvent.emit(data)
      }
    })

  }

  getUserDetails(userId) {
    this.userService.getSingleUserById(userId).subscribe((res: any) => {
      let user = {
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        userId: res.data.userId,
        userName: res.data.userName
      }
      this.userEvent.emit(user)
    })

  }

  ngOnDestroy(): void {
    this.dialog.closeAll()

  }
}