import { ActionType } from '../constants/action_type'

export const setChats = (chats) => {
    return {
        type: ActionType.SET_CHATS,
        payload: chats
    }
}
