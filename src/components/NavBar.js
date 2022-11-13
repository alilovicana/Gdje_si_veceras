import React, { useState } from "react";
import { Link } from 'react-router-dom';

function NavBar() {
    const refreshPage = () => {
        window.location.reload();
    }
    return (
        <ul >
            <li onClick={refreshPage}><Link to="/">OGLASI</Link></li>
            <li onClick={refreshPage}><Link to="/CreatePost">KREIRAJ OGLAS</Link></li>
            <li onClick={refreshPage}><Link to="/Login">PRIJAVA</Link></li>
            <li onClick={refreshPage}><Link to="/Profile">PROFIL</Link></li>
            <li onClick={refreshPage}><Link to="/Registration">REGISTRACIJA</Link></li>
            <li onClick={refreshPage}><Link to="/Logout">ODJAVA</Link></li>
        </ul>
    )
}
export default NavBar;