import { Action } from '@ngrx/store';

export enum IncomingMessagesTypes {
    ADD_INCOMINGMESSAGES = '[IncomingMessages] add'
}

export class IncomingMessagesAction implements Action {
    readonly type;
    payload: any;
}

export class AddIncomingMessages implements Action {
    readonly type = IncomingMessagesTypes.ADD_INCOMINGMESSAGES
    constructor(public payload: any) {
    }
}

export type UserInfoActions = AddIncomingMessages;