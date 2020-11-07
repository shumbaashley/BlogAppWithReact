import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <Fragment>
            <nav className="navbar bg-dark">
            <h1>
                <Link to="#"><i className="fas fa-code"></i> Blog Site </Link>
            </h1>
            <ul>
                <li><Link to="#">Editors</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
            </nav>
        </Fragment>
    )
}

export default Navbar