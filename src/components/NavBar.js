import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';

function NavBar() {
    const refreshPage = () => {
        window.location.reload();
    }
    return (
        <ul >
            <li onClick={refreshPage}><NavLink to="/">OGLASI</NavLink></li>
            <li onClick={refreshPage}><NavLink to="/CreateAds">KREIRAJ OGLAS</NavLink></li>
            <li onClick={refreshPage}><NavLink to="/Login">PRIJAVA</NavLink></li>
            <li onClick={refreshPage}><NavLink to="/Profile">PROFIL</NavLink></li>
            <li onClick={refreshPage}><NavLink to="/Registration">REGISTRACIJA</NavLink></li>
            <li onClick={refreshPage}><NavLink to="/Logout">ODJAVA</NavLink></li>
        </ul>
    )
}
export default NavBar;
