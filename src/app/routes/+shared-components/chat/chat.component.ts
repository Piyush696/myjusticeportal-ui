import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import * as io from 'socket.io-client';
import { Location } from '@angular/common';

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

  constructor(private userService: UserService, private loc: Location, private router: Router) { }

  ngOnInit() {
    // console.log(location.pathname);
    // console.log(location.href);
    // console.log(location.origin);
    // console.log(this.router.url);
    console.log(window.location.href.replace(/^http(s?):\/\//i, "").split(':'));
    // const angularRoute = this.loc.path();
    // const url = window.location.href;
    // console.log(url)
    // const domainAndApp = url.replace(angularRoute, '');
    // console.log(domainAndApp)
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
