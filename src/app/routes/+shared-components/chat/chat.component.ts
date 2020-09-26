import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import * as io from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:8810';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  socket;
  message: string;
  @Input() lawyerId;
  userId;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.setupSocketConnection();
    this.getSingleUser();
  }

  getSingleUser() {
    this.userService.getSingleUser().subscribe((user: any) => {
      this.userId = user.data.userId
    })
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: any) => {
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
      "receiverId": this.lawyerId,
      "senderId": this.userId,
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
