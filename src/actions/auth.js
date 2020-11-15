import axios from 'axios'
import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_PROFILE
} from './types'


// Load user
export const loadUser = () => async dispatch => {
     if(localStorage.token){
         setAuthToken(localStorage.token)
     }

     try {
         const res = await axios.get('http://localhost:5000/api/users/me')
         dispatch({
             type : USER_LOADED,
             payload : res.data
         })
     } catch (error) {
       dispatch({
           type : AUTH_ERROR
       })  
     }
}


// Register User

export const register = ({name, username, email, password}) => async dispatch =>{
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }


    const body = JSON.stringify({name, username,  email, password});

    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', body, config);

        dispatch({
            type : REGISTER_SUCCESS,
            payload : res.data 
        })
        dispatch(loadUser())
    } catch (err){
        const error = err.response.data 
        if(error){
            dispatch(setAlert(error.message, 'danger'))
        }
        dispatch({
            type : REGISTER_FAIL
        })

    }


}


// Login User

export const login = (email, password) => async dispatch =>{
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }


    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', body, config);

        dispatch({
            type : LOGIN_SUCCESS,
            payload : res.data 
        })

        dispatch(loadUser())
    } catch (err){
        const error = err.response.data 
        if(error){
            dispatch(setAlert(error.message, 'danger'))
        }
        dispatch({
            type : LOGIN_FAIL
        })

    }


}


// Logout

export const logout = () => dispatch => {
    dispatch({ type : CLEAR_PROFILE  })
    dispatch({ type : LOGOUT  })

}