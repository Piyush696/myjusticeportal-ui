import { Action } from '@ngrx/store';

export enum RoleTypes {
    LOAD_ROLE = '[Role] load',
    ADD_ROLE = '[Role] add',
    ADD_ROLE_FAILURE = '[Role] add failure'
}

export class RoleAction implements Action {
    readonly type;
    payload: any;
}

export class LoadRole implements Action {
    readonly type = RoleTypes.LOAD_ROLE;
    constructor() {
    }
}

export class AddRole implements Action {
    readonly type = RoleTypes.ADD_ROLE;
    constructor(public payload: any) {
    }
}

export class AddRoleFailure implements Action {
    readonly type = RoleTypes.ADD_ROLE_FAILURE;
    constructor() {
    }
}

export type RoleActions = LoadRole | AddRole | AddRoleFailure;