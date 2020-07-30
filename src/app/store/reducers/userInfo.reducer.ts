import { UserInfoAction, UserInfoTypes } from '../actions/userInfo.actions';

const initialState: any = {
};

export function UserInfoReducer(state: any = initialState, action: UserInfoAction) {
    switch (action.type) {
        case UserInfoTypes.ADD_USERINFO:
            return action.payload;
        default:
            return state;
    }
};