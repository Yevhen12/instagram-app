import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { currentProfileUserReducer } from './currentProfileUserRuducer'
import { chatsReducer } from './chatsReducer'
import { currentPostReducer } from './currentPostReducer'
import { isLoadingReducer } from './isLoadingReducer'

export const reducers = combineReducers(
    {
        userReducer,
        currentProfileUserReducer,
        chatsReducer,
        currentPostReducer,
        isLoadingReducer
    }
)