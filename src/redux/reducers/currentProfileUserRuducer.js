import { ActionType } from "../constants/action_type"

const initializeState = {
    user: {}
}

export const currentProfileUserReducer = (state = initializeState, action) => {
    switch(action.type) {
        case ActionType.SET_CURRENT_PROFILE_USER :
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            }
        default: 
            return state
    }
}