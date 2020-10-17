import { IncomingMessagesAction, IncomingMessagesTypes } from '../actions/incomingMessages.actions';

const initialState: any = {
};

export function incomingMessagesReducer(state: any = initialState, action: IncomingMessagesAction) {
    switch (action.type) {
        case IncomingMessagesTypes.ADD_INCOMINGMESSAGES:
            return action.payload;

        default:
            return state;
    }
};