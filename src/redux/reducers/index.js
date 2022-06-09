import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { currentProfileUserReducer } from './currentProfileUserRuducer'

export const reducers = combineReducers(
    {
        userReducer,
        currentProfileUserReducer,
    }
)