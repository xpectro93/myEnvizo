import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import AboutUs from './components/AboutUs/AboutUs'
import SignUpContainer from './containers/SignUpContainer'
import LoginContainer from './containers/LoginContainer'
import UserContainer from './containers/UserContainer';
import GoalsContainer from './containers/GoalsContainer'
import CommunityContainer from './containers/CommunityContainer'

import NavbarContainer from './containers/NavbarContainer'
import Error from "./components/Global/Error.js"
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavbarContainer />
        <Switch>
          <Route exact path='/' component={HomeContainer}/>
          <Route path='/signup' component={SignUpContainer}/>
          <Route path='/login' component={LoginContainer}/>
          <Route path='/aboutus' component={AboutUs}/>
          <Route path='/profile/:id' component={UserContainer}/>
          <Route path='/goal/:goal_id' component={GoalsContainer}/>
          <Route path='/community/:id' component={CommunityContainer}/>
          <Route path='/goals/community/:community_id' component={GoalsContainer}/>
          <Route path="/*" component={Error} />
        </Switch>
      </div>
    );
  }
}

export default App;
