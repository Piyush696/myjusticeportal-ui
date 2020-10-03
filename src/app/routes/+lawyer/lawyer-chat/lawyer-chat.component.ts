import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'app/services/message.service';
import * as io from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:8810';

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
  userMessageList = [];
  isMessage: boolean = false;
  lawyerId: any;


  constructor(private store: Store<any>, private messageService: MessageService) { }

  ngOnInit() {
    this.store.select(s => s.userInfo).subscribe(x => {
      this.userInfo = x
    })
    this.setupSocketConnection();
    this.allusers()
  }

  ngOnChanges(): void {
    const myNode = document.getElementById("message-list");
    while (myNode.lastElementChild) {
      myNode.removeChild(myNode.lastElementChild);
    }
  }

  loadMessage() {
    this.allMessages.forEach(item => {
      if (item.senderId !== this.userInfo?.userId) {
        this.messageData = item.message
        const element = document.createElement('li');
        element.innerHTML = item.message;
        element.style.background = '#ededed';
        element.style.color = '#333442';
        element.style.padding = '15px 30px';
        element.style.margin = '10px';
        element.style.textAlign = 'left';
        document.getElementById('message-list').appendChild(element);
      } else {
        this.messageData = item.message
        const element = document.createElement('li');
        element.innerHTML = item.message;
        element.style.background = '#333442';
        element.style.color = '#ffff';
        element.style.padding = '15px 30px';
        element.style.margin = '10px';
        element.style.textAlign = 'right';
        document.getElementById('message-list').appendChild(element);

      }
    })
  }

  allusers() {
    this.messageService.getAllUserMessages().subscribe((res: any) => {
      console.log(res)
      res.data.forEach(item => {
        this.userMessageList.push(item.inmate)
      })
      this.userMessageList = this.userMessageList.filter((v, i, a) => a.findIndex(t => (t.userId === v.userId)) === i)
      console.log(this.userMessageList)
    })
  }

  getMessageHistory(id) {
    this.messageService.getAllMessages(id).subscribe((res: any) => {
      console.log(res)
      this.allMessages = res.data
      this.loadMessage()
    })
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast' + this.userInfo.userId, (data: any) => {
      this.messageData = data;
      if (data) {
        const element = document.createElement('li');
        element.innerHTML = data.message;
        element.style.background = '#ededed';
        element.style.color = '#333442';
        element.style.padding = '15px 30px';
        element.style.margin = '10px';
        document.getElementById('message-list').appendChild(element);
      }
    });
  }

  SendMessage() {
    const data = {
      "receiverId": this.messageData.senderId,
      "senderId": this.messageData.receiverId,
      "message": this.message
    }
    this.socket.emit('message', data);
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = '#333442';
    element.style.color = 'white';
    element.style.padding = '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('message-list').appendChild(element);
    this.message = '';
  }

  messageEvent(value) {
    console.log(value)
    this.isMessage = value.isMessage;
    this.lawyerId = value.lawyerId
    this.getMessageHistory(this.lawyerId)
  }
}
