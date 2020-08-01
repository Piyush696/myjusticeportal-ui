import { UserInfoReducer } from './userInfo.reducer';
import { RoleReducer } from './role.reducer';

export const rootReducer = {
    userInfo: UserInfoReducer,
    role: RoleReducer
}