import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import * as io from 'socket.io-client';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { environment } from '../../../../environments/environment';

const SOCKET_ENDPOINT = environment.socketEndpoint;

@HostListener('scroll', ['$event'])
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, OnChanges {

  @Input() receiverId;
  @Input() allMessages = [];
  @Input() isChatLimit;

  socket;
  isDisabled: boolean = false;
  disabledText: string;
  message: string = "";
  userId;
  userInfo: any;
  messageList: any;
  isLoading: boolean;

  constructor(private userService: UserService, private loc: Location, private router: Router, private store: Store<any>) {

  }

  ngOnInit() {
    this.store.select(s => s.userInfo).subscribe(x => {
      this.userInfo = x
    })
    this.setupSocketConnection();
    this.getSingleUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //this.checkConnection();
    this.checkConnection();

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
        console.log(this.allMessages)
        this.allMessages.push(data)
      }
    });
  }

  SendMessage() {
    if (this.message !== '') {
      const data = {
        "receiverId": this.receiverId,
        "senderId": this.userId,
        "message": this.message,
        "createdAt": new Date()
      }
      this.allMessages.push(data)
      this.checkConnection();
      this.socket.emit('message', data);
      this.message = ''
    }
  }


  checkConnection() {
    let count = 0;
    if (this.isChatLimit) {
      if (this.allMessages) {
        this.allMessages.forEach(msg => {
          if (msg.senderId == this.userInfo.userId) {
            count++;
          }
        })
        if (count >= 10) {
          this.isDisabled = true;
        } else {
          this.isDisabled = false;
        }
      }
    }
  }
}
