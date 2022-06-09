import { ActionType } from '../constants/action_type'

export const setCurrentProfileUser = (user) => {
    return {
        type: ActionType.SET_CURRENT_PROFILE_USER,
        payload: user
    }
}
