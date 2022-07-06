import { ActionType } from "../constants/action_type"

const initializeState = []

export const chatsReducer = (state = initializeState, action) => {
    switch (action.type) {
        case ActionType.SET_CHATS:
            return [
                ...action.payload
            ]
        default:
            return state
    }
}