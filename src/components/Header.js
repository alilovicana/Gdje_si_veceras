import React, { useState, useEffect,useContext } from 'react';
import './Components.css';
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext"

function Header() {
  const { user } = useContext(AuthContext);
  return (
    <div className='header'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-5'>
            <Link to='/' style={{ textDecoration: "none" }}>
              <div className="title">Gdje si večeras?</div>
            </Link>
          </div>
          <div className='col-md-7'>
            <div className='navbar'>
            <div>
            {
                user? (
                    <ul >
                        <li><NavLink to="/">OGLASI</NavLink></li>
                        <li><NavLink to={"/CreateAds"+'/'+user.result[0].id+'/'}>KREIRAJ OGLAS</NavLink></li>
                        <li ><NavLink to={"/Profile"+'/'+user.result[0].id+'/'}>PROFIL</NavLink></li>
                        <li ><NavLink to="/Logout">ODJAVA</NavLink></li>
                    </ul>
                ) : (
                    <ul >
                        <li ><NavLink to="/">OGLASI</NavLink></li>
                        <li ><NavLink to="/Login">PRIJAVA</NavLink></li>
                        <li ><NavLink to="/Registration">REGISTRACIJA</NavLink></li>
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