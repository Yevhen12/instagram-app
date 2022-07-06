import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { currentProfileUserReducer } from './currentProfileUserRuducer'
import { chatsReducer } from './chatsReducer'

export const reducers = combineReducers(
    {
        userReducer,
        currentProfileUserReducer,
        chatsReducer
    }
)