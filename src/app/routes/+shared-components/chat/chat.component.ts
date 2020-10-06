import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import * as io from 'socket.io-client';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';

const SOCKET_ENDPOINT = 'https://dev-mjp-ui.herokuapp.com/:8810';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnChanges {

  @Input() lawyerId;
  @Input() allMessages = [];

  socket;
  message: string;
  userId;
  userInfo: any;
  messageList: any;
  isLoading: boolean;

  constructor(private userService: UserService, private loc: Location, private router: Router, private store: Store<any>) { }


  ngOnInit() {
    this.store.select(s => s.userInfo).subscribe(x => {
      this.userInfo = x
    })
    // console.log(window.location.href.replace(/^http(s?):\/\//i, "").split(':'));
    this.setupSocketConnection();
    this.getSingleUser();
  }

  ngOnChanges(): void {
    this.isLoading = true;
    const myNode = document.getElementById("message-list");
    while (myNode.lastElementChild) {
      myNode.removeChild(myNode.lastElementChild);
    }
    this.isLoading = true;
    setTimeout(() => {
      this.loadMessage()
    }, 5000)
  }

  loadMessage() {
    this.allMessages.forEach(item => {
      if (item.senderId !== this.userInfo?.userId) {
        this.messageList = item.message
        const element = document.createElement('li');
        element.innerHTML = item.message;
        element.style.background = '#ededed';
        element.style.color = '#333442';
        element.style.padding = '15px 30px';
        element.style.margin = '10px';
        // element.style.textAlign = 'left';
        element.style.width = '250px';
        const elementDiv = document.createElement('div');
        elementDiv.style.display = 'flex';
        elementDiv.style.justifyContent = 'flex-start';
        elementDiv.style.wordBreak = 'break-all';
        element.style.borderRadius = '7px';

        elementDiv.appendChild(element)
        document.getElementById('message-list').appendChild(elementDiv);
      } else {
        this.messageList = item.message
        const element = document.createElement('li');
        element.innerHTML = item.message;
        element.style.background = '#333442';
        element.style.color = '#ffff';
        element.style.padding = '15px 30px';
        element.style.margin = '10px';
        element.style.width = '250px';
        // element.style.textAlign = 'right';
        const elementDiv = document.createElement('div');
        elementDiv.style.display = 'flex';
        elementDiv.style.justifyContent = 'flex-end';
        element.style.borderRadius = '7px';
        elementDiv.style.wordBreak = 'break-all';

        elementDiv.appendChild(element)
        document.getElementById('message-list').appendChild(elementDiv);
      }
      this.isLoading = false;
    })
    this.isLoading = false;
  }

  getSingleUser() {
    this.userService.getSingleUser().subscribe((user: any) => {
      this.userId = user.data.userId
    })
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast' + this.userInfo.userId, (data: any) => {
      if (data) {
        this.messageList = data.message
        const element = document.createElement('li');
        element.innerHTML = data.message;
        element.style.background = '#ededed';
        element.style.color = '#333442';
        element.style.padding = '15px 30px';
        element.style.margin = '10px';
        element.style.width = '250px';
        const elementDiv = document.createElement('div');
        elementDiv.style.display = 'flex';
        elementDiv.style.wordBreak = 'break-all';
        element.style.borderRadius = '7px';
        elementDiv.style.justifyContent = 'flex-start';

        elementDiv.appendChild(element)


        document.getElementById('message-list').appendChild(elementDiv);
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
    // element.style.textAlign = 'right';
    element.style.width = '250px';
    const elementDiv = document.createElement('div');
    elementDiv.style.display = 'flex';
    elementDiv.style.wordBreak = 'break-all';
    element.style.borderRadius = '7px';
    elementDiv.style.justifyContent = 'flex-end';

    elementDiv.appendChild(element)
    document.getElementById('message-list').appendChild(elementDiv);
    this.message = '';
  }

}
