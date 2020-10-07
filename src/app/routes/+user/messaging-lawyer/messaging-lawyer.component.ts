import { Component, OnInit } from '@angular/core';
import { HireLawyerService } from 'app/services/hire-lawyer.service';
import { MessageService } from 'app/services/message.service';

// const SOCKET_ENDPOINT = 'localhost:8810';

@Component({
  selector: 'app-messaging-lawyer',
  templateUrl: './messaging-lawyer.component.html',
  styleUrls: ['./messaging-lawyer.component.css']
})

export class MessagingLawyerComponent implements OnInit {
  organizationList: any;
  orgDetails: any;
  isMessage: boolean = false;
  lawyerId: any;
  userMessageList = [];
  allMessages: any;
  oldUserList = [];
  headerText = "Lawyers";

  constructor(private hireLawyerService: HireLawyerService, private messageService: MessageService) { }

  ngOnInit() {
    // this.getOrganizations();
    this.getMessagedUser();
  }

  getMessagedUser() {
    this.messageService.getMessageUsers().subscribe((res: any) => {
      console.log(res)
      this.userMessageList = res.data
      this.getOldUserList()

    })
  }



  getMessageHistory(id) {
    this.messageService.getAllMessages(id).subscribe((res: any) => {
      this.allMessages = res.data


    })
  }

  getOldUserList() {
    this.messageService.getOldUsers().subscribe((res: any) => {
      this.oldUserList = res.data
      this.filterData()
    })
  }

  filterData() {
    this.userMessageList = this.userMessageList.filter(item1 =>
      !this.oldUserList.some(item2 => (item2.userId === item1.userId)))
  }

  // getOrganizations() {
  //   this.hireLawyerService.getOrganization().subscribe((res: any) => {
  //     this.organizationList = res.data.users;
  //   })
  // }

  // onSelectOrg(checked, organizationId) {
  //   if (checked) {
  //     this.getAllUsers(organizationId)
  //   } else {
  //     this.orgDetails = '';
  //   }
  // }

  getAllUsers(organizationId) {
    this.hireLawyerService.getUsersLawyer(organizationId).subscribe((users: any) => {
      this.orgDetails = users.data
    })
  }

  messageEvent(value) {
    this.isMessage = value.isMessage;
    this.lawyerId = value.lawyerId
    this.getMessageHistory(this.lawyerId)
  }

}
