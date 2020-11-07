import React, { Fragment, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios' 


export const Register = () => {

const [formData, setFormData] = useState({
    name : "",
    username : "",
    email : "",
    password : "",
    password2 : ""
})

const {name, username, email, password, password2} = formData

const onChangeHandler = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
}

const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (password !== password2) {
        console.log("Passwords do not match")
    } else {

        const newUser = {
            name,
            username,
            email,
            password
        }

        try {
            const config = {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }
            
            const body = JSON.stringify(newUser)
        
            const res = await axios.post('http://localhost:5000/api/auth/register', body, config ) 
            console.log(res.data)

        } catch (error) {
            console.log(error)
            
        }        
    }

}

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmitHandler(e)}>
                <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Name" 
                    name="name"
                    value={name}
                    onChange={e => onChangeHandler(e)} 
                    required />
                </div>
                <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Username" 
                    name="username"
                    value={username}
                    onChange={e => onChangeHandler(e)}  
                    required />
                </div>
                <div className="form-group">
                <input 
                    type="email"
                    placeholder="Email Address" 
                    name="email"
                    value={email}
                    onChange={e => onChangeHandler(e)}  
                    required/>
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={e => onChangeHandler(e)} 
                    minLength="6"
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={e => onChangeHandler(e)} 
                    minLength="6"
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>            
        </Fragment>
    )
}
