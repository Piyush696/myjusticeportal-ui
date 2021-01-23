import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InmateDefenderService } from 'app/services/inmate-defender.service';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-pd-chat',
  templateUrl: './pd-chat.component.html',
  styleUrls: ['./pd-chat.component.css']
})
export class PdChatComponent implements OnInit {
  socket;
  message: string;
  messageData: any;
  userInfo: any;
  allMessages: any;
  isMessage: boolean = false;
  receiverId: any;
  userList = [];
  headerText = "Your Connected Inmates"
  isLoading:boolean = false;

  constructor(private store: Store<any>, private messageService: MessageService , private defenderService: InmateDefenderService) { }

  ngOnInit() {
    this.store.select(s => s.userInfo).subscribe(x => {
      this.userInfo = x
    })
    this.allusers()
  }



  allusers() {
    this.defenderService.getConnectInmate().subscribe((res: any) => {
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
