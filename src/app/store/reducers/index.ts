import { UserInfoReducer } from './userInfo.reducer';
import { RoleReducer } from './role.reducer';
import { incomingMessagesReducer } from './incomingMessages.reducer';

export const rootReducer = {
    userInfo: UserInfoReducer,
    role: RoleReducer,
    incomingMessages: incomingMessagesReducer
}