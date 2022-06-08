import { ActionType } from "../constants/action_type"

const initializeState = {
    home: null,
    heart: null,
    compass: null,
    messenger: null,
    add: null,
    profile: null
}

export const iconReducer = (state = initializeState, action) => {
    switch (action.type) {
        case ActionType.SET_ACTIVE_ICON:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}