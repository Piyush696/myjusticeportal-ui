import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService } from 'app/services/message.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.css']
})
export class ChatModalComponent implements OnInit {
  allMessages: any;
  @Input() userId: any
  @Input() userName: string
  senderId: any;
  message: any;
  isLoading: boolean;

  @Output() isModelClose = new EventEmitter()

  constructor(private messageService: MessageService, private userService: UserService,) { }

  ngOnInit(): void {
    this.getSingleUser()
    this.getMessageHistory(this.userId);
  }

  getMessageHistory(id) {
    this.isLoading = true;
    this.messageService.getAllMessages(id).subscribe((res: any) => {
      this.isLoading = false;
      this.allMessages = res.data
    })
  }


  getSingleUser() {
    this.userService.getSingleUser().subscribe((user: any) => {
      this.senderId = user.data.userId
    })
  }

  close() {
    this.isModelClose.emit(true)
}


  SendMessage() {
    if (this.message !== '') {
      let message = {
        "senderId": this.senderId,
        "receiverId": this.userId,
        "message": this.message,
        "createdAt": new Date()
      }
      this.messageService.saveMessage(message).subscribe((res: any) => {
        this.getMessageHistory(this.userId);
        this.allMessages.push(this.message)
        this.message = ''
      })
    }
  }

}
