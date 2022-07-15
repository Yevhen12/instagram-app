import { ActionType } from '../constants/action_type'

export const setCurrentPost = (post) => {
    return {
        type: ActionType.SET_CURRENT_POST,
        payload: post
    }
}
