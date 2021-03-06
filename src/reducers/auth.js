import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED
} from '../actions/types'

const initialState = {
    isAuthenticated : null,
    loading : true,
    user : null
}


export default function(state = initialState, action){
    const {type, payload} = action

    switch(type){
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated : true,
                loading : false,
                user : payload
            }     
            
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated : true,
                loading : false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated : true,
                loading : false
            }
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case ACCOUNT_DELETED:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                user : null,
                token : null,
                ...payload,
                isAuthenticated : false,
                loading : false
            }
        default:
            return state;
    }
}
