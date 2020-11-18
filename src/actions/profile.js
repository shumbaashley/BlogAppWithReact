import axios from 'axios'
import { setAlert } from './alert'
import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, GET_PROFILES, EDIT_PROFILE, ACCOUNT_DELETED } from './types'


// Get Current User's Profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/profile/me')

        dispatch({
            type : GET_PROFILE,
            payload : res.data
        })
    } catch (error) {
        dispatch({
            type : PROFILE_ERROR,
            payload : {
                message : error.response.statusText,
                status  : error.response.status
            }
        })        
    }
}

// POST Create User Profile

export const createProfile = (formData, history) => async dispatch => {
    

    try {
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        const res = await axios.post('http://localhost:5000/api/profile', formData, config)

        dispatch({
            type : GET_PROFILE,
            payload : res.data
        })

        dispatch(setAlert("Profile Created", 'success'))

        history.push('/dashboard')
    } catch (err) {
        const error = err.response.data 

        if(error){
            dispatch(setAlert(error.message, 'danger'))
        }
        dispatch({
            type : PROFILE_ERROR,
            payload : {
                message : err.response.statusText,
                status  : err.response.status
            } 
        })
    }
}

// Get All Profiles

export const getProfiles = () => async dispatch => {
    dispatch({ type : CLEAR_PROFILE })
    try {
        const res = await axios.get('http://localhost:5000/api/profile')

        dispatch({
            type : GET_PROFILES,
            payload : res.data
        })
    } catch (err) {
        dispatch({
            type : PROFILE_ERROR,
            payload : {
                message : err.response.statusText,
                status  : err.response.status
            }
        })        
    }
}

// Get Profile by ID

export const getProfileById = userId => async dispatch => {
    dispatch({ type : CLEAR_PROFILE })
    try {
        const res = await axios.get(`http://localhost:5000/api/profile/user/${userId}`)

        dispatch({
            type : GET_PROFILE,
            payload : res.data
        })
    } catch (err) {
        dispatch({
            type : PROFILE_ERROR,
            payload : {
                message : err.response.statusText,
                status  : err.response.status
            }
        })        
    }
}

// Edit Profile
export const editProfile = (formData, history) => async dispatch => {
    

    try {
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        const res = await axios.put('http://localhost:5000/api/profile', formData, config)

        dispatch({
            type : EDIT_PROFILE,
            payload : res.data
        })

        dispatch(setAlert("Profile Updated", 'success'))

        history.push('/dashboard')
    } catch (err) {
        const error = err.response.data 

        if(error){
            dispatch(setAlert(error.message, 'danger'))
        }
        dispatch({
            type : PROFILE_ERROR,
            payload : {
                message : err.response.statusText,
                status  : err.response.status
            } 
        })
    }
}

// Delete User Account and Profile
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? This cannot be undone!'))
    try {
         await axios.delete(`http://localhost:5000/api/users/me`)
        
         dispatch({
            type : CLEAR_PROFILE
        }) 
         dispatch({
            type : ACCOUNT_DELETED
        })
        dispatch(setAlert("Account has been successfully deleted", ''))

    } catch (err) {
        dispatch({
            type : PROFILE_ERROR,
            payload : {
                message : err.response.statusText,
                status  : err.response.status
            } 
        })
    }

}
