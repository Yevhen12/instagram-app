import { ActionType } from '../constants/action_type'

export const setActiveIconHome = (iconObj) => {
    return {
        type: ActionType.SET_ACTIVE_ICON,
        payload: iconObj
    }
}