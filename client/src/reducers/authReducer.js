import * as actionTypes from "../actions/actionTypes";
import axios from "axios"

const API_URL = process.env.REACT_APP_API

export const actionCreators = {
    login: (credentials) => async (dispatch, getState) => {
        const response = await axios.post(`${API_URL}/user/login`, {
            email: credentials.email,
            password: credentials.password
        })
        const data = response.data
        if (response.status === 200)
            dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: { auth: data.auth, token: data.token, userId: data.userId } })
    },
    register: (credentials) => async (dispatch, getState) => {
        const response = await axios.post(`${API_URL}/user/register`, {
            username: credentials.username,
            email: credentials.email,
            password: credentials.password
        })
        const data = response.data
        if (response.status === 200)
            dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: { auth: data.auth, token: data.token, userId: data.userId } })

    },
    logout: () => (dispatch)=>{
        dispatch({ type: actionTypes.LOGOUT })
    }
}
function userIsAuthenticated() {
    if (sessionStorage.length > 0)
        return sessionStorage.getItem("auth")
    return false
}
const initialState = {
    userLoggedIn: userIsAuthenticated(),
    auth: false,
    token: null,
    userId: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            sessionStorage.setItem("userId", action.payload.userId)
            sessionStorage.setItem("auth", action.payload.auth)
            sessionStorage.setItem("token", action.payload.token)
            return {
                ...state,
                userLoggedIn: true,
                auth: action.payload.auth,
                token: action.payload.token,
                userId: action.payload.userId
            }
        case actionTypes.LOGOUT:
            sessionStorage.removeItem("auth")
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("userId")
            return {
                ...state,
                userLoggedIn: false,
                auth: false,
                token: null,
                userId: null
            }
        default:
            return state;
    }
}