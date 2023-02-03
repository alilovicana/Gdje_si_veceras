import React, { useState, useEffect, useContext } from 'react';
import './Components.css';
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext"
import logo from "./img/logo.png"
function Header() {
  const { user } = useContext(AuthContext);
  return (
    <div className='header'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-5'>
            <Link to='/' style={{ textDecoration: "none" }}>
              {/* <img src={logo} alt='logo' /> */}
              <div className="title">WhereTonight?</div>
            </Link>
          </div>
          <div className='col-md-7'>
            <div className='navbar'>
              <div>
                {
                  user ? (
                    <ul >
                      <li><NavLink exact to="/">POSTS</NavLink></li>
                      <li><NavLink to={"/CreateAds" + '/' + user.result[0].id + '/'}>CREATE POST</NavLink></li>
                      <li ><NavLink to={"/Profile" + '/' + user.result[0].id + '/'}>PROFILE</NavLink></li>
                      <li ><NavLink to="/Logout">LOG OUT</NavLink></li>
                    </ul>
                  ) : (
                    <ul >
                      <li ><NavLink exact to="/">POSTS</NavLink></li>
                      <li ><NavLink to="/Login">LOG IN</NavLink></li>
                      <li ><NavLink to="/Registration">REGISTRATION</NavLink></li>
                    </ul>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Header;