import React, { Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register  from './components/auth/Register';
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import  Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';
import PrivateRoute from './components/routing/PrivateRoute'
import {loadUser} from './actions/auth' 
import setAuthToken from './utils/setAuthToken'

// Redux
import { Provider } from 'react-redux';
import store from './store'

if(localStorage.token){
  setAuthToken(localStorage.token)
}



const  App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar/>
          <Route exact path="/" component={Landing}/>
          <section className="container">
          <Alert/>
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/profiles" component={Profiles}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
            <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
            <PrivateRoute exact path="/profile/:id" component={Profile}/>
          </Switch>
        </section>

      </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
