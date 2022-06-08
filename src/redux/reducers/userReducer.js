import { ActionType } from "../constants/action_type"

const initializeState = {
    user: {
        displayName: '',
        name: '',
        email: '',
        password: '',
    }
}

export const userReducer = (state = initializeState, action) => {
    switch(action.type) {
        case ActionType.SET_USER :
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