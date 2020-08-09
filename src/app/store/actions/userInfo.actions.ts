import { Action } from '@ngrx/store';

export enum UserInfoTypes {
    ADD_USERINFO = '[UserInfo] add'
}

export class UserInfoAction implements Action {
    readonly type;
    payload: any;
}

export class AddUserInfo implements Action {
    readonly type = UserInfoTypes.ADD_USERINFO;
    constructor(public payload: any) {
    }
}

export type UserInfoActions = AddUserInfo;