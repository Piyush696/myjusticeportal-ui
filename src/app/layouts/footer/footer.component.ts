import { Component, HostBinding, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'environments/environment';
import { Store } from '@ngrx/store';
import { AddIncomingMessages } from 'app/store/actions/incomingMessages.actions';
const SOCKET_ENDPOINT = environment.socketEndpoint;
@Component({
    moduleId: module.id,
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html'
})

export class FooterComponent implements OnInit {
    socket;
    test: Date = new Date();
    userInfo;
    constructor(private store: Store<any>) { }

    ngOnInit(): void {
        this.store.select(s => s.userInfo).subscribe(x => {
            this.userInfo = x
        })
        this.setupSocketConnection();
    }

    setupSocketConnection() {
        this.socket = io(SOCKET_ENDPOINT);
        this.socket.on('message-broadcast' + this.userInfo.userId, (data: any) => {
            if (data) {
                console.log(data)
                this.store.dispatch(new AddIncomingMessages(Object.assign({}, data)));
            }
        });
    }

}
