import './App.css';
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Profile from './components/Profile';
import CreateAds from './components/CreateAds.js';
import Login from './components/Login.js';
import Ads from './components/Ads.js';
import Logout from './components/Logout';
import Registration from './components/Registration.js';
import { Route, Link } from 'react-router-dom';
import Header from './components/Header';
import HeaderImg from './components/HeaderImg';

function App() {
  return (
    <div className="App" >
      <Header/>
      <HeaderImg/>
      <div className="content">
        <Route exact path="/" component={Ads} />
        <Route exact path="/CreateAds" component={CreateAds} />
        <Route exact path="/Profile" component={Profile} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Registration" component={Registration} />
        <Route exact path="/Logout" component={Logout} />
      </div>
    </div>
  );
}

export default App;
