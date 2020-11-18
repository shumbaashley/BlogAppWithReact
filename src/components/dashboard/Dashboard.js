import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteAccount, getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'


const Dashboard = ({getCurrentProfile, deleteAccount, auth : { user }, profile : { profile, loading } }) => {
  
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])
  
    return loading && profile === null ? <Spinner/> : (
        <Fragment>
            <h1 className='large text-primary'>Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"/> Welcome {user && user.username}
            </p>

            { profile !== null ? (
                <Fragment>
                    <DashboardActions></DashboardActions>
                    <div className="my-2">
                        <button className="btn btn-danger" onClick={() => deleteAccount()}>
                            <i className="fas fa-user-minus"></i> Delete My Account
                        </button>
                    </div>
                </Fragment>
                ) : 
                <Fragment>
                    <p>You have not yet created a profile,  please add your information</p>
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </Fragment>}
        </Fragment>
    )
}

Dashboard.propTypes = {
    getCurrentProfile : PropTypes.func.isRequired,
    deleteAccount : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    profile : PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth : state.auth,
    profile : state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard)
