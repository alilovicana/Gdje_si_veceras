import React, { useState, useEffect } from "react";
import video from './img/video.mp4';
import axios from "axios";
const LogOut = () => {
  const logout = () => {
    axios.delete(`http://localhost:3001/Logout`).then((response) => {
      console.log("youre logged out!")
    });
  };
  useEffect(()=> {
    axios.get("http://localhost:3001/Login").then((response) => {
        if (response.data.loggedIn ===false) {
           logout();
        }
    });
}, []);
  return (
    <div className='video'>
      <video src={video} autoPlay />
      <div className="logout-btn">
        <button name="logout" type="submit" className="btn btn-success">Odjava</button>
      </div>
    </div>

  )
}
export default LogOut