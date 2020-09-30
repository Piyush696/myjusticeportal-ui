import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.select(s => s.userInfo).subscribe(x => {
      this.userInfo = x
    })
    this.setupSocketConnection();
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
}
