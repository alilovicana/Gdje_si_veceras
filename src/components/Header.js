import React, { useState } from 'react';
import './Components.css';
import NavBar from './NavBar';

function Header() {
  const [isUserLoggedIn,setUserLoggedIn] = useState(false)
  const userAutetication=()=>{
    setUserLoggedIn(!isUserLoggedIn);
  }
  return (
    <div className='header'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-5'>
            <div className="title">Gdje si večeras?</div>
          </div>
          <div className='col-md-7'>
            <div className='navbar'><NavBar isUserLoggedIn={isUserLoggedIn} userAutetication={userAutetication}/></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Header;