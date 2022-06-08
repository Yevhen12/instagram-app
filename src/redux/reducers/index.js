import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { iconReducer } from './iconReducer'

export const reducers = combineReducers(
    {
        userReducer,
        iconReducer
    }
)