import axios from 'axios'
import { setAlert } from './alert'
import { GET_PROFILE, PROFILE_ERROR } from './types'


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