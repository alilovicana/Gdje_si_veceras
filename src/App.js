import React, { useState, useContext } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Profile from './components/Profile';
import CreateAds from './components/CreateAds.js';
import Login from './components/Login.js';
import Ads from './components/Ads.js';
import Logout from './components/Logout';
import Registration from './components/Registration.js';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import HeaderImg from './components/HeaderImg';
import { AuthContext } from "./context/AuthContext"

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App" >
      <Header />
      <HeaderImg />
      <div className="content">
        <Route exact path="/"><Ads /></Route>
        <Route exact path="/Login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route exact path="/Registration">{user ? <Redirect to="/" /> : <Registration/>}</Route>
        <Route exact path="/CreateAds" >{user ? <CreateAds/> : <Registration />}</Route>
        <Route exact path="/Logout">{user ? <Logout/> : <Ads/>}</Route>
        <Route exact path="/Profile" >{user ? <Profile/> : <Registration />}</Route>
      </div>
    </div>

  );
}

export default App;
