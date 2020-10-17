import { Component, HostBinding, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'environments/environment';
import { Store } from '@ngrx/store';
import { AddIncomingMessages } from 'app/store/actions/incomingMessages.actions';
const SOCKET_ENDPOINT = environment.socketEndpoint;
@Component({
    moduleId: module.id,
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html',
    styleUrls: ['./footer.component.scss']

})

export class FooterComponent implements OnInit {
    socket;
    test: Date = new Date();
    userInfo;
    footerText: string;
    isButton: boolean;
    buttonLink: any;
    constructor(private store: Store<any>) { }

    ngOnInit(): void {
        this.store.select(s => s.userInfo).subscribe(x => {
            this.userInfo = x
            if (x.roles[0].roleId == 1) {
                this.isButton = true;
                this.footerText = "Message My Lawyer";
                this.buttonLink = "user/message-my-lawyer";
            } else if (x.roles[0].roleId == 3) {
                this.isButton = true;
                this.footerText = "Message";
                this.buttonLink = "lawyer/lawyer-chat";
            } else {
                this.isButton = false;
            }
        })
        this.setupSocketConnection();
    }

    setupSocketConnection() {
        let x = [];
        this.socket = io(SOCKET_ENDPOINT);
        this.socket.on('message-broadcast' + this.userInfo.userId, (data: any) => {
            if (data) {
                console.log(data)
                let msg = {
                    data: data
                }
                x.push(msg)
                this.store.dispatch(new AddIncomingMessages(Object.assign({}, data)));
                // console.log(Object.keys(msg).length + 1);
                if ((this.userInfo.roles[0].roleId == 3) && (this.userInfo.userId === data.receiverId)) {
                    this.footerText = 'You have' + x.length + 'unreadMessages';
                }
                if ((this.userInfo.roles[0].roleId == 1) && (this.userInfo.userId === data.receiverId)) {
                    this.footerText = 'You have' + x.length + 'unreadMessages';
                }
            }
        });
    }

    onClickButton() {
        console.log('dwed', this.userInfo.roles[0].roleId)
        if (this.userInfo.roles[0].roleId == 1) {
            this.footerText = "Message My Lawyer";
        } else {
            this.footerText = "Message";
        }
    }
}


