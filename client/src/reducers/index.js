import {combineReducers} from "redux"

import authReducer from "./authReducer"
import habitReducer from "./habitReducer"
import { reducer as formReducer} from 'redux-form'
import modalReducer from './modalReducer'


export default combineReducers({
    authReducer,
    habitReducer,
    form:formReducer,
    modalReducer
})