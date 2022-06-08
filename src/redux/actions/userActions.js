import { ActionType } from '../constants/action_type'

export const setUser = (user) => {
    return {
        type: ActionType.SET_USER,
        payload: user
    }
}
