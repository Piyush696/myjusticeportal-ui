import { RoleAction, RoleTypes } from '../actions/role.actions';

const initialState: any = [];

export function RoleReducer(state: any = initialState, action: RoleAction) {

    switch (action.type) {
        case RoleTypes.LOAD_ROLE:
            return state;

        case RoleTypes.ADD_ROLE:
            return action.payload.data;

        case RoleTypes.ADD_ROLE_FAILURE:
            return state;

        default:
            return state;
    }
};