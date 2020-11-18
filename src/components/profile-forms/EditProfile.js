import React, {useState, useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {editProfile, getCurrentProfile} from '../../actions/profile'
import { Link, withRouter } from 'react-router-dom' 


const EditProfile = ({profile : {profile, loading}, editProfile, getCurrentProfile, history}) => {

    const [formData, setFormData] = useState({
        company : '',
        website : '',
        bio : '',
        location : '',
        skills : ''
    })


    useEffect(() => {
        getCurrentProfile()


        setFormData({
            company : loading || !profile.company ? '' : profile.company,
            website : loading || !profile.website ? '' : profile.website,
            bio : loading || !profile.bio ? '' : profile.bio,
            location : loading || !profile.location ? '' : profile.location,
            skills : loading || !profile.skills ? '' : profile.skills.join(','),

        })
    }, [loading]) 

    const {company, website, bio, location, skills } = formData

    const onChangeHandler = e => setFormData({...formData, [e.target.name] : e.target.value})
    

    const onSubmitHandler = e => {
        e.preventDefault()
        editProfile(formData, history)
    }

    return (
        <Fragment>
           
      <h1 className="large text-primary">
        Edit Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmitHandler(e)}>
        <div className="form-group">
          <input onChange={e => onChangeHandler(e)} value={company} type="text" placeholder="Company" name="company" />
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input onChange={e => onChangeHandler(e)} value={website} type="text" placeholder="Website" name="website" />
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input onChange={e => onChangeHandler(e)} value={location} type="text" placeholder="Location" name="location" />
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input onChange={e => onChangeHandler(e)} value={skills} type="text" placeholder="* Skills" name="skills" />
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>

        <div className="form-group">
          <textarea onChange={e => onChangeHandler(e)} value={bio} placeholder="A short bio of yourself" name="bio"></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
     
        </Fragment>
    )
}

EditProfile.propTypes = {
    editProfile :PropTypes.func.isRequired,
    getCurrentProfile : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile : state.profile
})

export default connect(mapStateToProps, {editProfile, getCurrentProfile})(withRouter(EditProfile))
