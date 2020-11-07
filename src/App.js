import React, { Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <section className="container">
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
          </section>
        </Switch>

      </Fragment>
    </Router>
  );
}

export default App;
