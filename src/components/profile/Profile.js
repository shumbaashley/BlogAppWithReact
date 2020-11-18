import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import {getProfileById} from '../../actions/profile'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'

const Profile = ({match, getProfileById, auth,  profile : {profile, loading}}) => {

    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById,match.params.id])

    return (
        <div>
            {profile === null || loading ? <Spinner/> : (
                <Fragment>
                    <Link to="/profiles" className="btn btn-light">
                         Back to Profiles
                    </Link>
                    {
                        auth.isAuthenticated && loading === false && auth.user._id === profile.user  && (
                            <Link to="edit-profile" className="btn btn-dark">
                                Edit Profile
                            </Link>
                        )
                    }

                    <div className="profile-grid my-1">
                        <ProfileTop  profile={profile}/>
                        <ProfileAbout profile={profile}/>
                    </div>
                </Fragment>
            )}
        </div>
    )
}

Profile.propTypes = {
    getProfileById : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile : state.profile,
    auth : state.auth
})

export default connect(mapStateToProps, {getProfileById})(Profile);
