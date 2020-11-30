import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'app/services/message.service';



@Component({
  selector: 'app-lawyer-chat',
  templateUrl: './lawyer-chat.component.html',
  styleUrls: ['./lawyer-chat.component.css']
})
export class LawyerChatComponent implements OnInit {

  socket;
  message: string;
  messageData: any;
  userInfo: any;
  allMessages: any;
  isMessage: boolean = false;
  receiverId: any;
  userList = [];
  headerText = "Your Connected Users"


  constructor(private store: Store<any>, private messageService: MessageService) { }

  ngOnInit() {
    this.store.select(s => s.userInfo).subscribe(x => {
      this.userInfo = x
    })
    this.allusers()
  }



  allusers() {
    this.messageService.getAllUserMessages().subscribe((res: any) => {
      this.userList = res.data
    })
  }

  getMessageHistory(id) {
    this.messageService.getAllMessages(id).subscribe((res: any) => {
      this.allMessages = res.data
    })
  }

  messageEvent(value) {
    this.isMessage = value.isMessage;
    this.receiverId = value.receiverId
    this.getMessageHistory(this.receiverId)
  }

  userAdd(user) {
    let data = this.userList.find(item => item.userId == user.userId)
    if (data == undefined) {
      this.userList.push(user)
    }
  }

}
