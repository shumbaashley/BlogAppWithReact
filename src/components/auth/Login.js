import React, { Fragment, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export const Login = () => {

    const [formData, setFormData] = useState({
        email : "",
        password : ""
    })

    const { email, password } = formData

    const onChangeHandler = e => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const config = {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }
            const body = JSON.stringify(formData)
        
            const res = await axios.post('http://localhost:5000/api/auth/login', body, config ) 
            console.log(res.data)

        } catch (error) {
            console.log(error)
            
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form className="form" onSubmit={e => onSubmitHandler(e)}>
                <div className="form-group">
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={e => onChangeHandler(e)}
                    required
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => onChangeHandler(e)}
                    name="password"
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>           
        </Fragment>
    )
}
