import { ActionType } from "../constants/action_type"

const initializeState = {
    isLoading: false
}

export const isLoadingReducer = (state = initializeState, action) => {
    switch (action.type) {
        case ActionType.SET_IS_LOADING:
            return {
                isLoading: action.payload
            }
        default:
            return state
    }
}