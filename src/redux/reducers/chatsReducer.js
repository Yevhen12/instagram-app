import { ActionType } from "../constants/action_type"

const initializeState = {
    chats: []
}

export const chatsReducer = (state = initializeState, action) => {
    switch (action.type) {
        case ActionType.SET_CHATS:
            return {
                chats: [...action.payload]
            }
        default:
            return state
    }
}