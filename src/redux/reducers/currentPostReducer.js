import { ActionType } from "../constants/action_type"

const initializeState = {
    post: {}
}

export const currentPostReducer = (state = initializeState, action) => {
    switch (action.type) {
        case ActionType.SET_CURRENT_POST:
            return {
                post: { ...action.payload }
            }
        default:
            return state
    }
}