import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';

function NavBar(props) {
    const { isUserLoggedIn, userAutetication } = props
    return (
        <div>
            {
                isUserLoggedIn ? (
                    <ul >
                        <li><NavLink to="/">OGLASI</NavLink></li>
                        <li><NavLink to="/CreateAds">KREIRAJ OGLAS</NavLink></li>
                        <li ><NavLink to="/Profile">PROFIL</NavLink></li>
                        <li onClick={() => { userAutetication() }}><NavLink to="/Logout">ODJAVA</NavLink></li>
                    </ul>
                ) : (
                    <ul >
                        <li ><NavLink to="/">OGLASI</NavLink></li>
                        <li onClick={() => { userAutetication() }}><NavLink to="/Login">PRIJAVA</NavLink></li>
                        <li ><NavLink to="/Registration">REGISTRACIJA</NavLink></li>
                    </ul>
                )
            }
        </div>
    )
}
export default NavBar;
